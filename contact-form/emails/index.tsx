// emails/ContactEmail.js
import { Html, Head, Body, Container, Heading, Text } from '@react-email/components';

export const ContactEmail = ({ email, message }) => (
  <Html>
    <Head />
    <Body>
      <Container>
        <Heading>New Contact Message</Heading>
        <Text><strong>Email:</strong> {email}</Text>
        <Text><strong>Message:</strong> {message}</Text>
      </Container>
    </Body>
  </Html>
);
