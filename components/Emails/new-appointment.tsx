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
import Image from "next/image";

interface NewAppointmentEmailProps {
  doctorName?: string;
  link: string;
  subject: string;
  message: string;
}
 
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
 
export const NewAppointmentEmail = ({
  doctorName = "",
  link,
  subject,
  message,
}: NewAppointmentEmailProps) => (
  <Html>
    <Head />
    <Preview>{subject}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Image
          src="https://utfs.io/f/nZhGQ10Fr4u8aJ1TryUsPG2nKqBJiw4H8W6kz3yv7YgLVSQN"
          width={100}
          height={32}
          alt="Claridy"
        />
 
        <Text style={title}>
          <strong>@{doctorName}</strong>, You have a new appointment
        </Text>
 
        <Section style={section}>
          <Text style={text}>
            Dear Dr.<strong>{doctorName}</strong>,
          </Text>
          <Text style={text}>{message}</Text>
 
          <Button>
            <Link href={link}>View to approve the Appointment</Link>
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
 
export default NewAppointmentEmail;
 
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