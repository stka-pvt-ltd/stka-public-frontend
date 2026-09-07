import { useState, useRef } from "react";
import { ArrowRight, Check, Loader2, AlertCircle, FileText, X, Upload } from "lucide-react";
import { useSubmitEnquiry } from "@/hooks/use-public-api";
import type { EnquiryRequest } from "@/types/api";

interface EnquiryFormProps {
  initialSubject?: string;
  initialMessage?: string;
}

export function EnquiryForm({ initialSubject, initialMessage }: EnquiryFormProps) {
  const [formData, setFormData] = useState<EnquiryRequest>({
    name: "",
    email: "",
    phone: "",
    subject: initialSubject || "Product Enquiry",
    company: "",
    message: initialMessage || "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationError, setValidationError] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const submitMutation = useSubmitEnquiry();

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidationError("");
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setValidationError("Please select a PDF file.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setValidationError("PDF must be 5 MB or smaller.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setValidationError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidationError("");

    // Client-side validation matching backend constraints
    if (!formData.name.trim()) {
      setValidationError("Please enter your full name.");
      return;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    if (!formData.phone || !formData.phone.trim()) {
      setValidationError("Please enter your phone number.");
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setValidationError("Please enter a message of at least 10 characters.");
      return;
    }

    if (selectedFile) {
      if (selectedFile.type !== "application/pdf" && !selectedFile.name.toLowerCase().endsWith(".pdf")) {
        setValidationError("Please select a PDF file.");
        return;
      }
      if (selectedFile.size > MAX_FILE_SIZE) {
        setValidationError("PDF must be 5 MB or smaller.");
        return;
      }

      const bodyData = new FormData();
      bodyData.append("name", formData.name.trim());
      bodyData.append("email", formData.email.trim().toLowerCase());
      bodyData.append("phone", formData.phone.trim());
      if (formData.subject) bodyData.append("subject", formData.subject.trim());
      if (formData.company) bodyData.append("company", formData.company.trim());
      bodyData.append("message", formData.message.trim());
      bodyData.append("attachment", selectedFile);

      submitMutation.mutate(bodyData);
    } else {
      submitMutation.mutate(formData);
    }
  };

  if (submitMutation.isSuccess) {
    return (
      <div className="border border-pharma/30 bg-pharma-soft/30 p-8">
        <div className="grid size-10 place-items-center bg-pharma text-white">
          <Check className="size-5" />
        </div>
        <h3 className="mt-5 font-display text-2xl text-primary">Enquiry Submitted Successfully</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Thank you for contacting STKA Pvt Ltd. Your enquiry has been logged in our system, and our corporate team will get back to you shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            submitMutation.reset();
            setSelectedFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            setFormData({
              name: "",
              email: "",
              phone: "",
              subject: initialSubject || "Product Enquiry",
              company: "",
              message: initialMessage || "",
            });
          }}
          className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-primary underline underline-offset-4"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-primary">
          Name <span className="text-pharma">*</span>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={submitMutation.isPending}
            placeholder="Your full name"
            className="h-12 border border-input bg-card px-4 text-sm font-normal normal-case tracking-normal outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
          />
        </label>

        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-primary">
          Email Address <span className="text-pharma">*</span>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={submitMutation.isPending}
            placeholder="you@company.com"
            className="h-12 border border-input bg-card px-4 text-sm font-normal normal-case tracking-normal outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-primary">
          Phone Number <span className="text-pharma">*</span>
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            disabled={submitMutation.isPending}
            placeholder="+91 9876543210"
            className="h-12 border border-input bg-card px-4 text-sm font-normal normal-case tracking-normal outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
          />
        </label>

        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-primary">
          Company Name
          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            disabled={submitMutation.isPending}
            placeholder="Organization / Company"
            className="h-12 border border-input bg-card px-4 text-sm font-normal normal-case tracking-normal outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
          />
        </label>
      </div>

      <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-primary">
        Subject
        <input
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          disabled={submitMutation.isPending}
          placeholder="Enquiry subject"
          className="h-12 border border-input bg-card px-4 text-sm font-normal normal-case tracking-normal outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
        />
      </label>

      <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-primary">
        Message <span className="text-pharma">*</span>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          disabled={submitMutation.isPending}
          placeholder="Please describe your inquiry, formulation requirement, or career application..."
          className="resize-y border border-input bg-card p-4 text-sm font-normal normal-case tracking-normal outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
        />
      </label>

      {/* PDF ATTACHMENT SELECTION FIELD */}
      <div className="grid gap-2">
        <span className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
          Attachment (Optional PDF / Resume)
        </span>
        
        {selectedFile ? (
          <div className="flex items-center justify-between border border-pharma/40 bg-pharma-soft/20 p-3">
            <div className="flex items-center gap-3 overflow-hidden">
              <FileText className="size-5 text-pharma shrink-0" />
              <div className="truncate">
                <p className="text-xs font-semibold text-primary truncate">{selectedFile.name}</p>
                <p className="text-[0.68rem] text-muted-foreground">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              disabled={submitMutation.isPending}
              className="p-1 text-muted-foreground transition-colors hover:text-destructive"
              title="Remove attached file"
              aria-label="Remove attached file"
            >
              <X className="size-4" />
            </button>
          </div>
        ) : (
          <label className="flex cursor-pointer items-center justify-center gap-2 border border-dashed border-input bg-card p-4 text-xs text-muted-foreground transition-colors hover:border-pharma hover:bg-secondary">
            <Upload className="size-4 text-pharma shrink-0" />
            <span>Attach PDF resume or document (Max 5 MB)</span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              disabled={submitMutation.isPending}
              className="hidden"
            />
          </label>
        )}
      </div>

      {validationError && (
        <div role="alert" className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="size-4 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {submitMutation.isError && (
        <div role="alert" className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="size-4 shrink-0" />
          <span>
            {submitMutation.error instanceof Error
              ? submitMutation.error.message
              : "Failed to submit enquiry. Please check your connection and try again."}
          </span>
        </div>
      )}

      <button
        type="submit"
        disabled={submitMutation.isPending}
        className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-3 bg-primary px-5 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-navy-soft disabled:opacity-50"
      >
        {submitMutation.isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Uploading / Sending...
          </>
        ) : (
          <>
            Submit Enquiry <ArrowRight className="size-4" />
          </>
        )}
      </button>
    </form>
  );
}
