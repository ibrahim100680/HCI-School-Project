import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPin, Phone, Mail, CheckCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
  privacy: z.boolean().refine((val) => val === true, "You must agree to the privacy policy"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      privacy: false,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
      });

      setIsSuccess(true);
      form.reset();
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Header */}
      <div className="hero-gradient text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="font-inter text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Have questions? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </div>
      
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-gray-50 border-0">
              <CardContent className="p-8">
                <h2 className="font-inter text-2xl font-bold mb-6 text-gray-800">Send us a Message</h2>
                
                {isSuccess && (
                  <Alert className="mb-6 border-success bg-success/10">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <AlertDescription className="text-success">
                      Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        {...form.register("firstName")}
                        className="mt-1"
                      />
                      {form.formState.errors.firstName && (
                        <p className="text-sm text-red-600 mt-1">
                          {form.formState.errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        {...form.register("lastName")}
                        className="mt-1"
                      />
                      {form.formState.errors.lastName && (
                        <p className="text-sm text-red-600 mt-1">
                          {form.formState.errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register("email")}
                      className="mt-1"
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-red-600 mt-1">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...form.register("phone")}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Select onValueChange={(value) => form.setValue("subject", value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Please select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing Question</SelectItem>
                        <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.subject && (
                      <p className="text-sm text-red-600 mt-1">
                        {form.formState.errors.subject.message}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Your Message *</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      {...form.register("message")}
                      className="mt-1"
                    />
                    {form.formState.errors.message && (
                      <p className="text-sm text-red-600 mt-1">
                        {form.formState.errors.message.message}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="privacy"
                      checked={form.watch("privacy")}
                      onCheckedChange={(checked) => form.setValue("privacy", checked as boolean)}
                    />
                    <Label htmlFor="privacy" className="text-sm text-gray-600">
                      I agree to the Privacy Policy and consent to being contacted by EduConnect. *
                    </Label>
                  </div>
                  {form.formState.errors.privacy && (
                    <p className="text-sm text-red-600">
                      {form.formState.errors.privacy.message}
                    </p>
                  )}
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white hover:bg-blue-700 btn-transition font-semibold text-lg py-4"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div>
              <Card className="hero-gradient text-white mb-8 border-0">
                <CardContent className="p-8">
                  <h2 className="font-inter text-2xl font-bold mb-6">Get in Touch</h2>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <MapPin className="text-accent" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Visit Our Campus</h3>
                        <p className="text-blue-100">
                          Kombo East, Faraba Campus<br />
                          The Gambia, West Africa
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <Phone className="text-accent" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Call Us</h3>
                        <p className="text-blue-100">
                          +220 3398266<br />
                          Mon-Fri 8AM-6PM GMT
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <Mail className="text-accent" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email Support</h3>
                        <p className="text-blue-100">
                          support@educonnect.gm<br />
                          info@educonnect.gm
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Section */}
              <Card className="bg-gray-50 border-0">
                <CardContent className="p-8">
                  <h3 className="font-inter text-xl font-bold mb-6 text-gray-800">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">How do I reset my password?</h4>
                      <p className="text-gray-600 text-sm">
                        Click the "Forgot Password" link on the login page and follow the instructions sent to your email.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Can I change my course after enrollment?</h4>
                      <p className="text-gray-600 text-sm">
                        Yes, you can switch courses within the first week of enrollment. Contact support for assistance.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Do you offer certificates?</h4>
                      <p className="text-gray-600 text-sm">
                        Yes, all our courses include industry-recognized certificates upon successful completion.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
