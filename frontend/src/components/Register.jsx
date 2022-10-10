import { useState } from "react";
import AlertMessage from "../commons/AlertMessage";
import useMatches from "../hooks/useMatches";
import back06 from "../assets/backgroundtesting/back06.png";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { TextField, Container, Box, Button } from "@mui/material";
import { AccountCircle, Password, Email } from "@mui/icons-material";
import styles from "../styles/simplePages.module.css";

const Register = () => {
  /* starting useNavigate */
  const navigate = useNavigate();

  /* media queries with custom hook */
  const matches = useMatches();

  /* registering process with react hook form; sending info to the db */
  const [registerStatus, setRegisterStatus] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post("http://localhost:5000/api/user/register", data)
      /* handling errors coming from the backend */
      .then(({ data }) => {
        if (!data.error) {
          setRegisterStatus("success");
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setRegisterStatus("error");
          setTimeout(() => setRegisterStatus(""), 3000);
          reset();
        }
      })
      .catch(() => navigate("/404"));
  };
  return (
    <div
      style={{
        backgroundImage: `url(${back06})`,
      }}
      className={styles.backImg}
    >
      <div className={styles.titleFormDiv}>
        <p className={styles.titleForm}>Register</p>
      </div>
      <Container
        maxWidth={matches ? "xs" : "m"}
        sx={{ p: 5, backgroundColor: "#e0e0e0", borderRadius: 1 }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }} mb={2}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              name="username"
              fullWidth
              label="username"
              variant="standard"
              {...register("username", {
                required: "Required field",
              })}
              error={!!errors?.username}
              helperText={errors?.username ? errors.username.message : null}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }} mb={2}>
            <Email sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              name="email"
              fullWidth
              label="email"
              variant="standard"
              {...register("email", {
                required: "Required field",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              error={!!errors?.email}
              helperText={errors?.email ? errors.email.message : null}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }} mb={2}>
            <Password sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              name="password"
              fullWidth
              type="password"
              label="password"
              variant="standard"
              {...register("password", {
                required: "Required field",
              })}
              error={!!errors?.password}
              helperText={errors?.password ? errors.password.message : null}
            />
          </Box>

          <Button
            variant="contained"
            type="submit"
            fullWidth
            disableElevation
            size="large"
            sx={{
              backgroundColor: "#fe4365",
              "&:hover": {
                backgroundColor: "#f9cdad",
                color: "#757575",
              },
            }}
          >
            Register
          </Button>
        </form>
        {registerStatus && (
          <AlertMessage
            type={registerStatus}
            message={
              registerStatus === "success"
                ? `Successfully created an account`
                : `Please try again`
            }
          />
        )}
      </Container>
    </div>
  );
};

export default Register;
