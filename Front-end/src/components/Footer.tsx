import { Typography } from "@mui/material";

function Footer() {
  return (
    <footer>
      <Typography
        align="center"
        padding={2}
        sx={{ borderTop: "1px solid #dfdfdf" }}
      >
        ©All Rights Reserved
      </Typography>
    </footer>
  );
}

export default Footer;
