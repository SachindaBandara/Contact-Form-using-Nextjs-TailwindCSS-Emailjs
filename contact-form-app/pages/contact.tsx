// File: pages/contact.tsx

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { Resend } from "resend";
import { Button, Input, Textarea } from "@chakra-ui/react";

// Validation schema using Yup
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  message: yup
    .string()
    .min(10, "Message should be at least 10 characters")
    .required("Message is required"),
});

type FormData = {
  email: string;
  message: string;
};

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to send message");

      const result = await response.json();
      if (result.success) {
        setSuccess("Message sent successfully!");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Failed to send message");
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input type="email" placeholder="Your email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <Textarea placeholder="Your message" {...register("message")} />
          {errors.message && <p>{errors.message.message}</p>}
        </div>

        <Button type="submit" isLoading={loading}>
          Send
        </Button>

        {success && <p>{success}</p>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default ContactForm;
