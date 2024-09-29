import * as React from 'react';

interface VerificationEmailProps {
    username: String,
    userOtp: String
    emailType: String,
    email: String
}

export function EmailTemplate({ username , email, emailType, userOtp }: VerificationEmailProps) {
  return (
    <div
      style={{
        maxWidth: "680px",
        margin: "0 auto",
        padding: "45px 30px 60px",
        background: "#f4f7ff",
        backgroundImage:
          "url(https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "800px 452px",
        backgroundPosition: "top center",
        fontSize: "14px",
        color: "#434343",
      }}
    >
      <header>
        <table style={{ width: "100%" }}>
          <tbody>
            <tr style={{ height: "0" }}>
              <td>
                <img alt="logo" src="/Layout/NgoLogo.png" height="30px" />
              </td>
              <td style={{ textAlign: "right" }}>
                <span style={{ fontSize: "16px", lineHeight: "30px", color: "#ffffff" }}>
                  {new Date().toLocaleDateString()}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </header>

      <main>
        <div
          style={{
            margin: "0",
            marginTop: "70px",
            padding: "92px 30px 115px",
            background: "#ffffff",
            borderRadius: "30px",
            textAlign: "center",
          }}
        >
          <div style={{ width: "100%", maxWidth: "489px", margin: "0 auto" }}>
            <h1 style={{ margin: "0", fontSize: "24px", fontWeight: "500", color: "#1f1f1f" }}>
              Your OTP
            </h1>
            <p style={{ margin: "0", marginTop: "17px", fontSize: "16px", fontWeight: "500" }}>
              {username}
            </p>
            <p style={{ margin: "0", marginTop: "17px", fontWeight: "500", letterSpacing: "0.56px" }}>
              Thank you for choosing NGO. Use the following OTP to complete the procedure to verify your account.
              OTP is valid for{" "}
              <span style={{ fontWeight: "600", color: "#1f1f1f" }}>5 minutes</span>. Do not share this code with
              others.
            </p>
            <p
              style={{
                margin: "0",
                marginTop: "60px",
                fontSize: "40px",
                fontWeight: "600",
                letterSpacing: "25px",
                color: "#ba3d4f",
              }}
            >
              {userOtp}
            </p>
          </div>
        </div>

        <p
          style={{
            maxWidth: "400px",
            margin: "0 auto",
            marginTop: "90px",
            textAlign: "center",
            fontWeight: "500",
            color: "#8c8c8c",
          }}
        >
          Need help? Ask at{" "}
          <a href="mailto:kushchauhan2004@gmail.com" style={{ color: "#499fb6", textDecoration: "none" }}>
            kushchauhan2004@gmail.com
          </a>{" "}
          or visit our{" "}
          <a href="" target="_blank" style={{ color: "#499fb6", textDecoration: "none" }}>
            Help Center
          </a>
        </p>
      </main>

      <footer
        style={{
          width: "100%",
          maxWidth: "490px",
          margin: "20px auto 0",
          textAlign: "center",
          borderTop: "1px solid #e6ebf1",
        }}
      >
        <p style={{ margin: "0", marginTop: "40px", fontSize: "16px", fontWeight: "600", color: "#434343" }}>NGO</p>
        <p style={{ margin: "0", marginTop: "8px", color: "#434343" }}></p>
        <div style={{ margin: "0", marginTop: "16px" }}>
          <a href="" target="_blank" style={{ display: "inline-block" }}>
            <img
              width="36px"
              alt="Facebook"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook"
            />
          </a>
          <a href="" target="_blank" style={{ display: "inline-block", marginLeft: "8px" }}>
            <img
              width="36px"
              alt="Instagram"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram"
            />
          </a>
          <a href="" target="_blank" style={{ display: "inline-block", marginLeft: "8px" }}>
            <img
              width="36px"
              alt="Twitter"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter"
            />
          </a>
          <a href="" target="_blank" style={{ display: "inline-block", marginLeft: "8px" }}>
            <img
              width="36px"
              alt="YouTube"
              src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503195931_210869/email-template-icon-youtube"
            />
          </a>
        </div>
      </footer>
    </div>
  );
}
