import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';

// Define validation schema for contact form
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  phone: z.string().optional(),
});

// Define validation schema for newsletter subscription
const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export const server = {
  // Contact form action
  submitContactForm: defineAction({
    input: contactFormSchema,
    handler: async (input, context) => {
      try {
        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Here you would typically save to database or send email
        console.log('Contact form submitted:', input);

        // Simulate potential error (remove this in production)
        if (input.email === 'error@example.com') {
          throw new ActionError({
            code: 'VALIDATION_ERROR',
            message: 'This email is not allowed for demo purposes',
          });
        }

        return {
          success: true,
          message: 'Thank you for your message! We will get back to you soon.',
          submittedAt: new Date().toISOString(),
        };
      } catch (error) {
        console.error('Contact form error:', error);
        throw new ActionError({
          code: 'INTERNAL_ERROR',
          message: 'Failed to submit contact form. Please try again.',
        });
      }
    },
  }),

  // Newsletter subscription action
  subscribeNewsletter: defineAction({
    input: newsletterSchema,
    handler: async (input, context) => {
      try {
        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 500));

        console.log('Newsletter subscription:', input);

        // Simulate potential error
        if (input.email === 'blocked@example.com') {
          throw new ActionError({
            code: 'VALIDATION_ERROR',
            message: 'This email is blocked from newsletter subscription',
          });
        }

        return {
          success: true,
          message: 'Successfully subscribed to newsletter!',
          subscribedAt: new Date().toISOString(),
        };
      } catch (error) {
        console.error('Newsletter subscription error:', error);
        throw new ActionError({
          code: 'INTERNAL_ERROR',
          message: 'Failed to subscribe to newsletter. Please try again.',
        });
      }
    },
  }),

  // Simple counter action for demo
  incrementCounter: defineAction({
    input: z.object({
      currentValue: z.number(),
    }),
    handler: async (input) => {
      return {
        newValue: input.currentValue + 1,
        message: `Counter incremented to ${input.currentValue + 1}`,
      };
    },
  }),
};
