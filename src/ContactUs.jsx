import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import api from "./API/Axios";

const ContactSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    message: Yup.string().required("Message is required"),
});

function ContactForm() {
    const handleSubmit = async (values, { resetForm }) => {
        try {
            await api.post("/messages", values);
            alert("Message sent successfully");
            resetForm();
        } catch (error) {
            console.error(error);
            alert("Failed to send message");
        }
    };

    return (
        <Formik
            initialValues={{ name: "", email: "", message: "" }}
            validationSchema={ContactSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="space-y-4">

                    {/* Name */}
                    <div>
                        <Field
                            name="name"
                            type="text"
                            placeholder="Your Name"
                            className="w-full p-3 rounded-lg border"
                        />
                        <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Email */}
                    <div>
                        <Field
                            name="email"
                            type="email"
                            placeholder="Your Email"
                            className="w-full p-3 rounded-lg border"
                        />
                        <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Message */}
                    <div>
                        <Field
                            as="textarea"
                            name="message"
                            rows="4"
                            placeholder="Your Message"
                            className="w-full p-3 rounded-lg border"
                        />
                        <ErrorMessage name="message" component="p" className="text-red-500 text-sm" />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg"
                    >
                        {isSubmitting ? "Sending..." : "Send Message"}
                    </button>

                </Form>
            )}
        </Formik>
    );
}

export default ContactForm;
