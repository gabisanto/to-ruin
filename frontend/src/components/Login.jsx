import { useState } from "react";
import useMatches from "../hooks/useMatches";
import back04 from "../assets/backgroundtesting/back04.jpg";
import AlertMessage from "../commons/AlertMessage";
import { /* useSelector, */ useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { sendLoginRequest } from "../store/user";
import { TextField, Container, Box, Button } from "@mui/material";
import { AccountCircle, Visibility } from "@mui/icons-material";
import styles from "../styles/simplePages.module.css";

const Login = () => {
  /* media queries custom hook */
  const matches = useMatches();

  /* login process starts */
  const [loginStatus, setLoginStatus] = useState("");
  /* const user = useSelector((state) => state.user); */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  /* configuration using react hook form */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  /* login event */
  const onSubmit = (data) => {
    dispatch(sendLoginRequest(data))
      .then(({ payload }) => {
        if (payload) {
          setLoginStatus("success");
          localStorage.setItem("user", JSON.stringify(payload));
          setTimeout(() => navigate("/"), 3000);
        } else {
          setLoginStatus("error");
          setTimeout(() => setLoginStatus(""), 3000);
          reset();
        }
      })
      .catch(() => navigate("/404"));
  };
  return (
    <div
      style={{
        backgroundImage: `url(${back04})`,
      }}
      className={styles.backImg}
    >
      <div className={styles.titleFormDiv}>
        <p className={styles.titleForm}>Login</p>
      </div>
      <Container
        maxWidth={matches ? "xs" : "m"}
        sx={{ p: 5, backgroundColor: "#e0e0e0", borderRadius: 1 }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
            }}
            mb={2}
          >
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
            <Visibility sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              name="password"
              type="password"
              fullWidth
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
            type="submit"
            variant="contained"
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
            Login
          </Button>
        </form>
        {loginStatus && (
          <AlertMessage
            type={loginStatus}
            message={
              loginStatus === "success"
                ? `Welcome aboard!`
                : `Please verify username and/or password`
            }
          />
        )}
      </Container>
    </div>
  );
};

export default Login;
