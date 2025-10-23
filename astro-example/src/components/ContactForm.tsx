import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Schema validation với Zod
const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Municipality or Company is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  zip: z.string().min(1, "Zip code is required"),
  message: z
    .string()
    .max(240, "Message must be less than 240 characters")
    .optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const messageValue = watch("message", "");
  const messageLength = messageValue?.length || 0;

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/pipedrive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06182B] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-white text-3xl font-bold text-center mb-8">
          Get Notified When We Launch
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                First Name
              </label>
              <input
                {...register("firstName")}
                type="text"
                className={`w-full px-4 py-3 rounded-lg bg-white border-2 transition-colors ${
                  errors.firstName
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                } focus:outline-none`}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Last Name
              </label>
              <input
                {...register("lastName")}
                type="text"
                className={`w-full px-4 py-3 rounded-lg bg-white border-2 transition-colors ${
                  errors.lastName
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                } focus:outline-none`}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Title
              </label>
              <input
                {...register("title")}
                type="text"
                className={`w-full px-4 py-3 rounded-lg bg-white border-2 transition-colors ${
                  errors.title
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                } focus:outline-none`}
                placeholder="Enter your title"
              />
              {errors.title && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Municipality or Company
              </label>
              <input
                {...register("company")}
                type="text"
                className={`w-full px-4 py-3 rounded-lg bg-white border-2 transition-colors ${
                  errors.company
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                } focus:outline-none`}
                placeholder="Enter municipality or company"
              />
              {errors.company && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.company.message}
                </p>
              )}
            </div>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Business Email
              </label>
              <input
                {...register("email")}
                type="email"
                className={`w-full px-4 py-3 rounded-lg bg-white border-2 transition-colors ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                } focus:outline-none`}
                placeholder="Enter your business email"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                {...register("phone")}
                type="tel"
                className={`w-full px-4 py-3 rounded-lg bg-white border-2 transition-colors ${
                  errors.phone
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                } focus:outline-none`}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          {/* Zip Code Row */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Zip Code
            </label>
            <input
              {...register("zip")}
              type="text"
              className={`w-full px-4 py-3 rounded-lg bg-white border-2 transition-colors ${
                errors.zip
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-blue-500"
              } focus:outline-none`}
              placeholder="Enter your zip code"
            />
            {errors.zip && (
              <p className="text-red-400 text-sm mt-1">{errors.zip.message}</p>
            )}
          </div>

          {/* Message Row */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Message (Optional)
            </label>
            <div className="relative">
              <textarea
                {...register("message")}
                rows={4}
                maxLength={240}
                className={`w-full px-4 py-3 rounded-lg bg-white border-2 transition-colors resize-none ${
                  errors.message
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                } focus:outline-none`}
                placeholder="Type a message here..."
              />
              <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                {messageLength}/240
              </div>
            </div>
            {errors.message && (
              <p className="text-red-400 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-start">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-3 rounded-lg font-medium transition-all ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-sky-500 hover:bg-sky-600 active:bg-sky-700"
              } text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>

          {/* Status Messages */}
          {submitStatus === "success" && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
              Thank you! Your information has been submitted successfully.
            </div>
          )}

          {submitStatus === "error" && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              Sorry, there was an error submitting your information. Please try
              again.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
