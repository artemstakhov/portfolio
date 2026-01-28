import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import {
    Send,
    Mail,
    User,
    MessageSquare,
    Plus,
    X,
    Phone,
    MessageCircle,
    FileText,
    Linkedin,
    Globe,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "react-toastify";

const baseSchema = z.object({
    name: z.string().min(2, "Name is too short (min 2 chars)"),
    email: z.string().email("Invalid email format"),
    message: z.string().min(10, "Message is too short (please tell me more)"),
});

interface ContactProps {
    title: string;
    contact: {
        nameLabel: string;
        emailLabel: string;
        messageLabel: string;
        namePlaceholder: string;
        emailPlaceholder: string;
        messagePlaceholder: string;
        sendButton: string;
        sendingText: string;
        successMessage: string;
        errorMessage: string;
        phoneValidationError: string;
        emailValidationError: string;
        telegramValidationError: string;
        whatsappValidationError: string;
        linkedinValidationError: string;
        portfolioValidationError: string;
        addFieldButton: string;
        removeFieldButton: string;
        fieldTypes: Record<string, string>;
        fieldPlaceholders: Record<string, string>;
    };
}

const Contact = ({ title, contact }: ContactProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting, errors: baseErrors },
    } = useForm({
        resolver: zodResolver(baseSchema),
    });

    const [additionalFields, setAdditionalFields] = useState<
        Array<{ id: string; type: string; value: string }>
    >([]);
    const [dynamicErrors, setDynamicErrors] = useState<Record<string, string>>(
        {},
    );
    const [fileInputs, setFileInputs] = useState<Record<string, File | null>>(
        {},
    );
    const [showFieldSelector, setShowFieldSelector] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setShowFieldSelector(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const availableFieldTypes = Object.entries(contact.fieldTypes).filter(
        ([key]) => !additionalFields.some((field) => field.type === key),
    );

    const addField = (fieldType: string) => {
        const newField = {
            id: `field_${Date.now()}`,
            type: fieldType,
            value: "",
        };
        setAdditionalFields([...additionalFields, newField]);
        setShowFieldSelector(false);
        setDynamicErrors((prev) => ({ ...prev, [newField.id]: "" }));
    };

    const removeField = (fieldId: string) => {
        setAdditionalFields((prev) =>
            prev.filter((field) => field.id !== fieldId),
        );
        setFileInputs((prev) => {
            const n = { ...prev };
            delete n[fieldId];
            return n;
        });
        setDynamicErrors((prev) => {
            const n = { ...prev };
            delete n[fieldId];
            return n;
        });
    };

    const getFieldIcon = (type: string) => {
        switch (type) {
            case "phone":
                return <Phone className="h-5 w-5 text-primary" />;
            case "telegram":
            case "whatsapp":
                return <MessageCircle className="h-5 w-5 text-primary" />;
            case "cv":
                return <FileText className="h-5 w-5 text-primary" />;
            case "linkedin":
                return <Linkedin className="h-5 w-5 text-primary" />;
            case "portfolio":
                return <Globe className="h-5 w-5 text-primary" />;
            default:
                return <User className="h-5 w-5 text-primary" />;
        }
    };

    const validateDynamicField = (
        type: string,
        value: string,
    ): string | null => {
        if (!value && type !== "cv") return "Field cannot be empty";

        try {
            switch (type) {
                case "phone":
                case "whatsapp":
                    if (!value || !isValidPhoneNumber(value))
                        throw new Error(contact.phoneValidationError);
                    break;
                case "telegram":
                    z.string()
                        .regex(/^(@|t\.me\/)\w+$/)
                        .parse(value);
                    break;
                case "linkedin":
                    z.string().url().includes("linkedin.com").parse(value);
                    break;
                case "portfolio":
                    z.string().url().parse(value);
                    break;
                default:
                    z.string().min(1).parse(value);
            }
            return null;
        } catch (error) {
            if (error instanceof z.ZodError) {
                return (
                    (contact[
                        `${type}ValidationError` as keyof typeof contact
                    ] as string) || "Invalid format"
                );
            }
            return (error as Error).message;
        }
    };

    const onSubmit = async (data: FieldValues) => {
        let hasErrors = false;
        const newDynamicErrors: Record<string, string> = {};

        additionalFields.forEach((field) => {
            if (field.type === "cv") return;
            const error = validateDynamicField(field.type, field.value);
            if (error) {
                newDynamicErrors[field.id] = error;
                hasErrors = true;
            }
        });

        if (hasErrors) {
            setDynamicErrors(newDynamicErrors);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("message", data.message);
            formData.append("timestamp", new Date().toISOString());

            additionalFields.forEach((field) => {
                if (field.type === "cv" && fileInputs[field.id]) {
                    formData.append("cv", fileInputs[field.id]!);
                } else if (field.value) {
                    formData.append(field.type, field.value);
                }
            });

            await axios.post(
                "https://n8n.artemstakhov.space/webhook/contact",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                },
            );

            toast.success(contact.successMessage);
            reset();
            setAdditionalFields([]);
            setFileInputs({});
            setDynamicErrors({});
        } catch (e) {
            console.error(e);
            toast.error(contact.errorMessage);
        }
    };

    const inputBaseClasses =
        "w-full bg-primary/5 border border-primary/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder-foreground/50 transition-all hover:bg-primary/10";
    const errorInputClasses = "border-red-500 focus:ring-red-500 bg-red-500/5";

    return (
        <section
            id="contact"
            className="py-12 md:py-16 pb-24 bg-gradient-to-b from-background to-primary/5"
        >
            <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
                <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-16 text-primary">
                    {title}
                </h2>

                <div className="bg-background/80 backdrop-blur-sm p-4 md:p-8 rounded-xl shadow-xl border border-primary/30">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative">
                                <label className="block text-sm font-medium text-primary/70 mb-2">
                                    {contact.nameLabel}
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                                    <input
                                        {...register("name")}
                                        placeholder={contact.namePlaceholder}
                                        className={`${inputBaseClasses} pl-10 pr-4 py-3 ${baseErrors.name ? errorInputClasses : ""}`}
                                    />
                                </div>
                                {baseErrors.name && (
                                    <span className="text-red-500 text-xs mt-1 block animate-pulse">
                                        {baseErrors.name.message as string}
                                    </span>
                                )}
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-primary/70 mb-2">
                                    {contact.emailLabel}
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                                    <input
                                        {...register("email")}
                                        placeholder={contact.emailPlaceholder}
                                        type="email"
                                        className={`${inputBaseClasses} pl-10 pr-4 py-3 ${baseErrors.email ? errorInputClasses : ""}`}
                                    />
                                </div>
                                {baseErrors.email && (
                                    <span className="text-red-500 text-xs mt-1 block animate-pulse">
                                        {baseErrors.email.message as string}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium text-primary/70 mb-2">
                                {contact.messageLabel}
                            </label>
                            <div className="relative">
                                <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-primary" />
                                <textarea
                                    {...register("message")}
                                    placeholder={contact.messagePlaceholder}
                                    className={`${inputBaseClasses} pl-10 pr-4 py-3 resize-none ${baseErrors.message ? errorInputClasses : ""}`}
                                    rows={6}
                                />
                            </div>
                            {baseErrors.message && (
                                <span className="text-red-500 text-xs mt-1 block animate-pulse">
                                    {baseErrors.message.message as string}
                                </span>
                            )}
                        </div>

                        <div className="space-y-4">
                            {additionalFields.map((field) => (
                                <div
                                    key={field.id}
                                    className="relative bg-primary/5 p-4 rounded-lg border border-primary/10"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="flex items-center text-sm font-medium text-primary">
                                            {getFieldIcon(field.type)}
                                            <span className="ml-2 font-semibold">
                                                {contact.fieldTypes[field.type]}
                                            </span>
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeField(field.id)
                                            }
                                            className="text-primary/40 hover:text-red-500 transition-colors p-1"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>

                                    <div className="relative">
                                        {field.type === "cv" ? (
                                            <input
                                                type="file"
                                                accept=".pdf,.doc,.docx"
                                                onChange={(e) => {
                                                    const file =
                                                        e.target.files?.[0] ||
                                                        null;
                                                    setFileInputs((prev) => ({
                                                        ...prev,
                                                        [field.id]: file,
                                                    }));
                                                }}
                                                className="block w-full text-sm text-foreground
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-primary/10 file:text-primary
                          hover:file:bg-primary/20 cursor-pointer"
                                            />
                                        ) : field.type === "phone" ||
                                          field.type === "whatsapp" ? (
                                            <div
                                                className={
                                                    dynamicErrors[field.id]
                                                        ? "border-red-500 rounded-lg border bg-red-500/5"
                                                        : ""
                                                }
                                            >
                                                <PhoneInput
                                                    value={field.value}
                                                    onChange={(value) => {
                                                        const updated =
                                                            additionalFields.map(
                                                                (f) =>
                                                                    f.id ===
                                                                    field.id
                                                                        ? {
                                                                              ...f,
                                                                              value:
                                                                                  value ||
                                                                                  "",
                                                                          }
                                                                        : f,
                                                            );
                                                        setAdditionalFields(
                                                            updated,
                                                        );
                                                        if (
                                                            dynamicErrors[
                                                                field.id
                                                            ]
                                                        )
                                                            setDynamicErrors(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    [field.id]:
                                                                        "",
                                                                }),
                                                            );
                                                    }}
                                                    placeholder={
                                                        contact
                                                            .fieldPlaceholders[
                                                            field.type
                                                        ]
                                                    }
                                                    defaultCountry="UA"
                                                    international
                                                    withCountryCallingCode
                                                    numberInputProps={{
                                                        className: `w-full bg-transparent border-none focus:ring-0 pl-2 py-3 text-foreground placeholder-foreground/50`,
                                                    }}
                                                    className={`${inputBaseClasses.replace("w-full", "")} flex items-center pl-3`}
                                                />
                                            </div>
                                        ) : (
                                            <input
                                                type="text"
                                                placeholder={
                                                    contact.fieldPlaceholders[
                                                        field.type
                                                    ]
                                                }
                                                value={field.value}
                                                onChange={(e) => {
                                                    const updated =
                                                        additionalFields.map(
                                                            (f) =>
                                                                f.id ===
                                                                field.id
                                                                    ? {
                                                                          ...f,
                                                                          value: e
                                                                              .target
                                                                              .value,
                                                                      }
                                                                    : f,
                                                        );
                                                    setAdditionalFields(
                                                        updated,
                                                    );
                                                    if (dynamicErrors[field.id])
                                                        setDynamicErrors(
                                                            (prev) => ({
                                                                ...prev,
                                                                [field.id]: "",
                                                            }),
                                                        );
                                                }}
                                                className={`${inputBaseClasses} px-4 py-3 ${dynamicErrors[field.id] ? errorInputClasses : ""}`}
                                            />
                                        )}
                                    </div>
                                    {dynamicErrors[field.id] && (
                                        <span className="text-red-500 text-xs mt-1 block animate-pulse font-medium">
                                            {dynamicErrors[field.id]}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>

                        {availableFieldTypes.length > 0 && (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowFieldSelector(!showFieldSelector)
                                    }
                                    className="flex items-center px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    {contact.addFieldButton}
                                </button>

                                {showFieldSelector && (
                                    <div className="absolute top-full left-0 mt-2 w-56 bg-background border border-primary/20 rounded-lg shadow-xl z-20 overflow-hidden">
                                        {availableFieldTypes.map(
                                            ([key, label]) => (
                                                <button
                                                    key={key}
                                                    type="button"
                                                    onClick={() =>
                                                        addField(key)
                                                    }
                                                    className="w-full text-left px-4 py-3 hover:bg-primary/10 transition-colors flex items-center gap-3 text-sm"
                                                >
                                                    {getFieldIcon(key)}
                                                    {label}
                                                </button>
                                            ),
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="text-center pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex items-center px-10 py-4 bg-primary text-primary-foreground shadow-lg shadow-primary/20 rounded-xl hover:bg-primary/90 focus:ring-4 focus:ring-primary/30 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 font-bold text-lg border border-white/20"
                            >
                                <Send className="h-5 w-5 mr-2" />
                                {isSubmitting
                                    ? contact.sendingText
                                    : contact.sendButton}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <style>{`
        .PhoneInput {
          display: flex;
          align-items: center;
        }
        .PhoneInputCountry {
          margin-right: 0.5rem;
        }
        .PhoneInputCountrySelect {
            background: hsl(var(--background));
            color: hsl(var(--foreground));
        }
      `}</style>
        </section>
    );
};

export default Contact;
