import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface UpdatedAppointmentEmailProps {
  patientName?: string;
  link: string;
  subject: string;
  message: string;
}
 
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
 
export const UpdatedAppointmentEmail = ({
  patientName = "",
  link,
  subject,
  message,
}: UpdatedAppointmentEmailProps) => (
  <Html>
    <Head />
    <Preview>{subject}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`https://utfs.io/f/nZhGQ10Fr4u8Qqr1DD5nDRH3UrOSVTNFz2tKCxwjeJodWLkb`}
          width="32"
          height="32"
          alt="Claridy"
        />
 
        <Text style={title}>
          <strong>@{patientName}</strong>, You have an updated appointment
        </Text>
 
        <Section style={section}>
          <Text style={text}>
            Dear Sir/Madam<strong>{patientName}</strong>,
          </Text>
          <Text style={text}>{message}</Text>
 
          <Button>
            <Link href={link}>View your appointment</Link>
          </Button>
          <Text style={text}>
            If you have any questions or need assistance, feel free to reach out.
          </Text>
        </Section>
 
        <Text style={footer}>
          Medical-app, Inc. ・88 Colin P Kelly Jr Street ・San Francisco, CA 94107
        </Text>
      </Container>
    </Body>
  </Html>
);
 
export default UpdatedAppointmentEmail;
 
const main = {
  backgroundColor: "#ffffff",
  color: "#24292e",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};
 
const container = {
  width: "480px",
  margin: "0 auto",
  padding: "20px 0 48px",
};
 
const title = {
  fontSize: "24px",
  lineHeight: 1.25,
};
 
const section = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  textAlign: "center" as const,
};
 
const text = {
  margin: "0 0 10px 0",
  textAlign: "left" as const,
};
 
const button = {
  fontSize: "24px",
  backgroundColor: "#28a745",
  color: "#fff",
  lineHeight: 1.5,
  borderRadius: "0.5em",
  padding: "0.75em 1.5em",
};
 
const links = {
  textAlign: "center" as const,
};
 
const link = {
  color: "#0366d6",
  fontSize: "12px",
};
 
const footer = {
  color: "#6a737d",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "60px",
};