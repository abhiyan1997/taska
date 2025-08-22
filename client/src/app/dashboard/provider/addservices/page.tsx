"use client"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { toast } from "sonner"

const ServiceSchema = Yup.object().shape({
  title: Yup.string().min(2, "Too Short!").required("Required"),
  description: Yup.string().min(10, "Too Short!").required("Required"),
  price: Yup.number()
    .typeError("Must be a number")
    .positive("Must be positive")
    .min(10, "Too long!")
    .required("Required"),
  by: Yup.string().min(3, "Too Short!").required("Required"),
  providerId: Yup.string().required("Required"),
})

const Addservices = () => {
  const providerData = JSON.parse(localStorage.getItem("Provider"))
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-8">
          {/* Header Section */}
          <div className="bg-black text-white p-6 rounded-lg mb-8">
            <h1 className="text-3xl font-bold">Add New Service</h1>
            <p className="text-gray-300 mt-2">Create a new service offering for your customers</p>
          </div>

          {/* Form Container */}
          <div className="max-w-2xl mx-auto">
            <Formik
              initialValues={{
                title: "",
                description: "",
                price: "",
                by: providerData.name,
                providerId: providerData._id,
              }}
              validationSchema={ServiceSchema}
              onSubmit={async (values, { resetForm }) => {
                const res = await axios.post("http://localhost:8080/addservices", values)
                toast(res.data.message)
                resetForm()
              }}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form className="bg-white rounded-lg shadow-lg p-8 space-y-6">
                  {/* Service Details Section */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Service Details</h2>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Service Title</label>
                      <Field
                        name="title"
                        as={Input}
                        className="border-gray-300 focus:border-black focus:ring-black"
                        placeholder="e.g., Professional Plumbing Services"
                      />
                      {errors.title && touched.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <Field
                        name="description"
                        as={Textarea}
                        className="border-gray-300 focus:border-black focus:ring-black min-h-[100px]"
                        placeholder="Describe your service in detail. What makes your service unique?"
                      />
                      {errors.description && touched.description && (
                        <div className="text-red-500 text-sm mt-1">{errors.description}</div>
                      )}
                    </div>
                  </div>

                  {/* Pricing Section */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Pricing & Provider</h2>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Price per Hour</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">रु</span>
                        <Field
                          name="price"
                          as={Input}
                          type="number"
                          className="border-gray-300 focus:border-black focus:ring-black pl-8"
                          placeholder="50"
                        />
                      </div>
                      {errors.price && touched.price && <div className="text-red-500 text-sm mt-1">{errors.price}</div>}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Service Provider</label>
                      <Field name="by" as={Input} className="border-gray-300 bg-gray-50" readOnly />
                      {errors.by && touched.by && <div className="text-red-500 text-sm mt-1">{errors.by}</div>}
                    </div>
                  </div>

                  {/* Submit Section */}
                  <div className="pt-6 border-t">
                    <Button
                      type="submit"
                      className="w-full bg-black hover:bg-gray-800 text-white py-3 text-lg font-medium"
                    >
                      Add Service
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Addservices
