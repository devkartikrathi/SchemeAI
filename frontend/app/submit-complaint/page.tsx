"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

export default function SubmitComplaint() {
    const [formData, setFormData] = useState({
        mobile: "",
        job: "",
        address: "",
        dob: "",
        age: "",
        income: "",
        message: "",
    })

    const [errors, setErrors] = useState({
        dob: "",
        age: "",
        income: "",
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

        // Clear errors when user starts typing
        if (name in errors) {
            setErrors((prev) => ({ ...prev, [name]: "" }))
        }
    }

    const validateForm = () => {
        let isValid = true
        const newErrors = { ...errors }

        // Validate age
        const age = Number.parseInt(formData.age)
        if (isNaN(age) || age < 18 || age > 120) {
            newErrors.age = "Please enter a valid age between 18 and 120"
            isValid = false
        }

        // Validate DOB (simple check if it's not empty and is a valid date)
        if (!formData.dob || isNaN(Date.parse(formData.dob))) {
            newErrors.dob = "Please enter a valid date of birth"
            isValid = false
        }

        // Validate income
        if (!formData.income) {
            newErrors.income = "Please select an income range"
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/raise-complaint/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit complaint");
            }

            const result = await response.json();
            console.log("Submitted data:", result);

            setIsSubmitted(true);
        } catch (error) {
            console.error("Error submitting complaint:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-primary/10 to-secondary/10 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-md mx-auto"
            >
                <Card className="backdrop-blur-sm bg-white/90">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center text-primary">Submit a Complaint</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                                        Mobile Number
                                    </label>
                                    <Input
                                        type="tel"
                                        id="mobile"
                                        name="mobile"
                                        required
                                        placeholder="Enter your mobile number"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="job" className="block text-sm font-medium text-gray-700 mb-1">
                                        Job
                                    </label>
                                    <Input
                                        type="text"
                                        id="job"
                                        name="job"
                                        required
                                        placeholder="Enter your job"
                                        value={formData.job}
                                        onChange={handleChange}
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                        Address
                                    </label>
                                    <Input
                                        type="text"
                                        id="address"
                                        name="address"
                                        required
                                        placeholder="Enter your address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                                        Date of Birth
                                    </label>
                                    <Input
                                        type="date"
                                        id="dob"
                                        name="dob"
                                        required
                                        value={formData.dob}
                                        onChange={handleChange}
                                        className={`w-full ${errors.dob ? "border-red-500" : ""}`}
                                    />
                                    {errors.dob && <p className="mt-1 text-xs text-red-500">{errors.dob}</p>}
                                </div>
                                <div>
                                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                                        Age
                                    </label>
                                    <Input
                                        type="number"
                                        id="age"
                                        name="age"
                                        required
                                        placeholder="Enter your age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        className={`w-full ${errors.age ? "border-red-500" : ""}`}
                                    />
                                    {errors.age && <p className="mt-1 text-xs text-red-500">{errors.age}</p>}
                                </div>
                                <div>
                                    <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-1">
                                        Annual Income
                                    </label>
                                    <select
                                        id="income"
                                        name="income"
                                        required
                                        value={formData.income}
                                        onChange={handleChange}
                                        className={`w-full p-2 border rounded-md ${errors.income ? "border-red-500" : "border-gray-300"}`}
                                    >
                                        <option value="">Select income range</option>
                                        <option value="<1">Less than ₹1 lakh</option>
                                        <option value="1-2.5">₹1 lakh - ₹2.5 lakh</option>
                                        <option value="2.5-5">₹2.5 lakh - ₹5 lakh</option>
                                        <option value="5-10">₹5 lakh - ₹10 lakh</option>
                                        <option value="10+">Above ₹10 lakh</option>
                                    </select>
                                    {errors.income && <p className="mt-1 text-xs text-red-500">{errors.income}</p>}
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                        Complaint Message
                                    </label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        required
                                        placeholder="Describe your complaint"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full h-32"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 flex items-center justify-center"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <motion.div
                                            className="h-5 w-5 border-t-2 border-r-2 border-white rounded-full animate-spin"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                        />
                                    ) : (
                                        <>
                                            Submit Complaint <Send className="ml-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="text-center py-8"
                            >
                                <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <h2 className="mt-4 text-lg font-semibold text-gray-900">Complaint Submitted Successfully!</h2>
                                <p className="mt-2 text-sm text-gray-600">Thank you for your feedback. We will review it shortly.</p>
                                <Button
                                    onClick={() => {
                                        setIsSubmitted(false)
                                        setFormData({ mobile: "", job: "", address: "", dob: "", age: "", income: "", message: "" })
                                    }}
                                    className="mt-6 bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
                                >
                                    Submit Another Complaint
                                </Button>
                            </motion.div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

