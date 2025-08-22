'use client'
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Mail, Phone, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "sonner";

const ProfileEdit = () => {
    const localData = JSON.parse(localStorage.getItem("Customer") || "{}");

    const ProfileSchema = Yup.object().shape({
        name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        phone: Yup.string().matches(/^[0-9]+$/, "Must be only digits").min(10, "Too short"),
        address: Yup.string(),
        bio: Yup.string().max(200, "Too Long!"),
    });

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    {/* Back button */}
                    <div className="mb-6">
                        <Link
                            href="/dashboard/customer"
                            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Dashboard
                        </Link>
                    </div>

                    <Card className="border border-border bg-card shadow-lg">
                        <CardHeader className="pb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                    <User className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl text-card-foreground">Edit Profile</CardTitle>
                                    <CardDescription>
                                        Update your personal information and preferences
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <Formik
                                initialValues={{
                                    id: localData._id,
                                    name: localData?.name || "",
                                    email: localData?.email || "",
                                    phone: localData?.phone || "",
                                    address: localData?.location || "",
                                    bio: localData?.bio || "",
                                }}
                                validationSchema={ProfileSchema}
                                onSubmit={async (values) => {
                                    const res= await axios.post('http://localhost:8080/updateprofile',values)
                                    toast(res.data.message) 
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form className="space-y-6">
                                        {/* Name + Email */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="name" className="flex items-center gap-2">
                                                    <User className="h-4 w-4" /> Full Name *
                                                </Label>
                                                <Field as={Input} id="name" name="name" placeholder="Enter your full name" />
                                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="flex items-center gap-2">
                                                    <Mail className="h-4 w-4" /> Email Address *
                                                </Label>
                                                <Field as={Input} id="email" name="email" type="email" placeholder="Enter your email" />
                                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                            </div>
                                        </div>

                                        {/* Phone + Address */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="phone" className="flex items-center gap-2">
                                                    <Phone className="h-4 w-4" /> Phone Number
                                                </Label>
                                                <Field as={Input} id="phone" name="phone" placeholder="Enter phone number" />
                                                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="address" className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4" /> Address
                                                </Label>
                                                <Field as={Input} id="address" name="address" placeholder="Enter address" />
                                                <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
                                            </div>
                                        </div>

                                        {/* Bio */}
                                        <div className="space-y-2">
                                            <Label htmlFor="bio">About You</Label>
                                            <Field as={Textarea} id="bio" name="bio" placeholder="Write something about yourself..." />
                                            <ErrorMessage name="bio" component="div" className="text-red-500 text-sm" />
                                        </div>

                                        {/* Buttons */}
                                        <div className="flex gap-3 pt-4">
                                            <Button type="submit" disabled={isSubmitting}>
                                                {isSubmitting ? "Saving..." : "Save Changes"}
                                            </Button>
                                            <Button variant="outline" asChild>
                                                <Link href="/dashboard/customer">Cancel</Link>
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProfileEdit;
