import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, GraduationCap, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Course } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface CourseRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
}

const step1Schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  education: z.string().min(1, "Education level is required"),
});

const step2Schema = z.object({
  cardName: z.string().min(1, "Cardholder name is required"),
  cardNumber: z.string().min(19, "Card number must be 16 digits"),
  expiryDate: z.string().min(5, "Expiry date is required"),
  cvv: z.string().min(3, "CVV is required"),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;

export default function CourseRegistrationModal({ isOpen, onClose, course }: CourseRegistrationModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const [step2Data, setStep2Data] = useState<Step2Data | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();

  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      education: "",
    },
  });

  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const handleStep1Submit = (data: Step1Data) => {
    setStep1Data(data);
    setCurrentStep(2);
  };

  const handleStep2Submit = (data: Step2Data) => {
    setStep2Data(data);
    setCurrentStep(3);
  };

  const handleCompleteRegistration = async () => {
    if (!agreedToTerms || !course || !user) return;

    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/course-registrations", {
        userId: user.id,
        courseId: course.id,
        paymentStatus: "completed",
      });

      setIsSuccess(true);
      toast({
        title: "Registration Successful!",
        description: "Welcome to the course! You'll receive a confirmation email shortly.",
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    setCurrentStep(1);
    setStep1Data(null);
    setStep2Data(null);
    setIsSuccess(false);
    setAgreedToTerms(false);
    step1Form.reset();
    step2Form.reset();
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiryDate = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length >= 2) {
      return digits.substring(0, 2) + '/' + digits.substring(2, 4);
    }
    return digits;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-lg relative max-h-screen overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        {!isSuccess ? (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="text-white" size={32} />
              </div>
              <h2 className="font-inter text-2xl font-bold text-gray-800">Course Registration</h2>
              <p className="text-gray-600">{course?.title}</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">
                  Step {currentStep}: {currentStep === 1 ? "Personal Information" : currentStep === 2 ? "Payment Information" : "Confirmation"}
                </h3>
                <span className="text-sm text-gray-500">{currentStep} of 3</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <form onSubmit={step1Form.handleSubmit(handleStep1Submit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      {...step1Form.register("firstName")}
                      className="mt-1"
                    />
                    {step1Form.formState.errors.firstName && (
                      <p className="text-sm text-red-600 mt-1">
                        {step1Form.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      {...step1Form.register("lastName")}
                      className="mt-1"
                    />
                    {step1Form.formState.errors.lastName && (
                      <p className="text-sm text-red-600 mt-1">
                        {step1Form.formState.errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    {...step1Form.register("email")}
                    className="mt-1"
                  />
                  {step1Form.formState.errors.email && (
                    <p className="text-sm text-red-600 mt-1">
                      {step1Form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...step1Form.register("phone")}
                    className="mt-1"
                  />
                  {step1Form.formState.errors.phone && (
                    <p className="text-sm text-red-600 mt-1">
                      {step1Form.formState.errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="education">Education Level</Label>
                  <Select onValueChange={(value) => step1Form.setValue("education", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                      <SelectItem value="master">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {step1Form.formState.errors.education && (
                    <p className="text-sm text-red-600 mt-1">
                      {step1Form.formState.errors.education.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full bg-primary text-white hover:bg-blue-700 btn-transition">
                  Continue to Payment
                </Button>
              </form>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <>
                <Card className="mb-6">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Course Summary</h4>
                    <div className="flex justify-between items-center">
                      <span>{course?.title}</span>
                      <span className="font-semibold">D{course?.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>Duration: {course?.duration}</span>
                      <span>Start Date: Jan 15, 2024</span>
                    </div>
                  </CardContent>
                </Card>

                <form onSubmit={step2Form.handleSubmit(handleStep2Submit)} className="space-y-6">
                  <div>
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      {...step2Form.register("cardName")}
                      className="mt-1"
                    />
                    {step2Form.formState.errors.cardName && (
                      <p className="text-sm text-red-600 mt-1">
                        {step2Form.formState.errors.cardName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      {...step2Form.register("cardNumber")}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value);
                        step2Form.setValue("cardNumber", formatted);
                      }}
                      maxLength={19}
                      className="mt-1"
                    />
                    {step2Form.formState.errors.cardNumber && (
                      <p className="text-sm text-red-600 mt-1">
                        {step2Form.formState.errors.cardNumber.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">MM/YY</Label>
                      <Input
                        id="expiryDate"
                        {...step2Form.register("expiryDate")}
                        onChange={(e) => {
                          const formatted = formatExpiryDate(e.target.value);
                          step2Form.setValue("expiryDate", formatted);
                        }}
                        maxLength={5}
                        className="mt-1"
                      />
                      {step2Form.formState.errors.expiryDate && (
                        <p className="text-sm text-red-600 mt-1">
                          {step2Form.formState.errors.expiryDate.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        {...step2Form.register("cvv")}
                        maxLength={4}
                        className="mt-1"
                      />
                      {step2Form.formState.errors.cvv && (
                        <p className="text-sm text-red-600 mt-1">
                          {step2Form.formState.errors.cvv.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      variant="outline"
                      className="flex-1 btn-transition"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-primary text-white hover:bg-blue-700 btn-transition"
                    >
                      Review & Confirm
                    </Button>
                  </div>
                </form>
              </>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-4">Registration Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Student:</span>
                        <span>{step1Data?.firstName} {step1Data?.lastName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email:</span>
                        <span>{step1Data?.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Course:</span>
                        <span>{course?.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>{course?.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Start Date:</span>
                        <span>Jan 15, 2024</span>
                      </div>
                      <hr className="my-3" />
                      <div className="flex justify-between font-semibold">
                        <span>Total Amount:</span>
                        <span>D{course?.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="confirmTerms"
                    checked={agreedToTerms}
                    onCheckedChange={setAgreedToTerms}
                  />
                  <Label htmlFor="confirmTerms" className="text-sm text-gray-600">
                    I confirm that all information provided is accurate and I agree to the course terms and conditions.
                  </Label>
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    variant="outline"
                    className="flex-1 btn-transition"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleCompleteRegistration}
                    disabled={!agreedToTerms || isSubmitting}
                    className="flex-1 bg-success text-white hover:bg-green-700 btn-transition"
                  >
                    {isSubmitting ? "Processing..." : "Complete Registration"}
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Success Message */
          <div className="text-center">
            <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="text-white" size={40} />
            </div>
            <h3 className="font-inter text-2xl font-bold text-gray-800 mb-4">
              Registration Successful!
            </h3>
            <p className="text-gray-600 mb-6">
              Welcome to the course! You'll receive a confirmation email with your course access details shortly.
            </p>
            <Button onClick={handleClose} className="bg-primary text-white hover:bg-blue-700 btn-transition">
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
