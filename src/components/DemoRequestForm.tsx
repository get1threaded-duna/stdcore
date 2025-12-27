import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const demoFormSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(2, { message: "Company name must be at least 2 characters" })
    .max(100, { message: "Company name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  useCase: z.string().min(1, { message: "Please select a use case" }),
  additionalInfo: z
    .string()
    .trim()
    .max(500, { message: "Additional info must be less than 500 characters" })
    .optional(),
});

type DemoFormValues = z.infer<typeof demoFormSchema>;

const useCases = [
  { value: "ectd-migration", label: "eCTD v3.2 to v4.0 Migration" },
  { value: "esg-nextgen", label: "ESG NextGen Implementation" },
  { value: "legacy-reconstruction", label: "Legacy Data Reconstruction" },
  { value: "compliance-audit", label: "Compliance Audit Preparation" },
  { value: "other", label: "Other" },
];

const DemoRequestForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<DemoFormValues>({
    resolver: zodResolver(demoFormSchema),
    defaultValues: {
      companyName: "",
      email: "",
      useCase: "",
      additionalInfo: "",
    },
  });

  const onSubmit = async (data: DemoFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Demo Request Submitted",
      description: "Our team will contact you within 24 hours.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-success/20 border border-success/40 flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-success" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Request Received</h3>
        <p className="text-muted-foreground max-w-sm">
          Thank you for your interest. A solutions architect will contact you within 24 business hours.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Company Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Acme Pharmaceuticals"
                  className="bg-secondary/30 border-border/50 focus:border-primary"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Work Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="regulatory@company.com"
                  className="bg-secondary/30 border-border/50 focus:border-primary"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="useCase"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">Primary Use Case</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-secondary/30 border-border/50 focus:border-primary">
                    <SelectValue placeholder="Select your use case" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {useCases.map((useCase) => (
                    <SelectItem key={useCase.value} value={useCase.value}>
                      {useCase.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="additionalInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">
                Additional Details <span className="text-muted-foreground">(Optional)</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your current infrastructure or timeline..."
                  className="bg-secondary/30 border-border/50 focus:border-primary resize-none"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Request Demo Access
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          By submitting, you agree to our{" "}
          <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          {" "}and{" "}
          <a href="#" className="text-primary hover:underline">Terms of Service</a>.
        </p>
      </form>
    </Form>
  );
};

export default DemoRequestForm;
