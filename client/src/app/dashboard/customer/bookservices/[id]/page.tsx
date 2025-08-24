"use client"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { useEffect, useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, StarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useParams } from "next/navigation"
import { toast } from "sonner"

const BookingSchema = Yup.object().shape({
  date: Yup.date().required("Date is required"),
  timing: Yup.string().required("Timing is required"),
  phonenumber: Yup.string().required("Phone Number is required"),
  location: Yup.string().required("Location is required"),
  service: Yup.string(),
  price: Yup.number(),
  by: Yup.string(),
  providerId: Yup.string(),
})

const ReviewSchema = Yup.object().shape({
  rating: Yup.number().min(1, "Please select a rating").max(5).required("Rating is required"),
  comment: Yup.string().min(10, "Review must be at least 10 characters").required("Review is required"),
  name: Yup.string().required("Name is required"),
})

const BookServices = () => {
  const [data, setData] = useState({})
  const params = useParams()
  const { id } = params

  const [reviews, setReviews]= useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8080/getservicesbyid/${id}`)
      setData(res.data.message)
    }
    fetchData()

    const fetchReviews = async()=>{
      const res= await axios.get(`http://localhost:8080/getreviews/${id}`)
      setReviews(res.data.message)
    }
    fetchReviews()
  }, [id])

  const localData = JSON.parse(localStorage.getItem("Customer"))

  const renderStars = (rating, interactive = false, onStarClick = null) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`h-5 w-5 ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={interactive ? () => onStarClick(star) : undefined}
          />
        ))}
      </div>
    )
  }

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="py-12 px-4">
        <div className="max-w-2xl mx-auto space-y-8">
          <Formik
            enableReinitialize
            initialValues={{
              date: "",
              timing: "",
              phonenumber: "",
              location: "",
              customername: localData?.name || "",
              service: data.title || "",
              price: data.price,
              by: data.by || "",
              providerId: data.providerId,
            }}
            validationSchema={BookingSchema}
            onSubmit={async (values, { resetForm }) => {
              const res = await axios.post("http://localhost:8080/addappointments", values)
              toast(res.data.message)
              console.log(values)
              resetForm()
            }}
          >
            {({ values, errors, touched, setFieldValue, handleChange }) => (
              <Form>
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-black text-white p-8 text-center">
                    <h1 className="text-3xl font-bold mb-2">{values.service}</h1>
                    <p className="text-gray-300 text-lg">Professional service by {values.by}</p>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">रु {values.price}</span>
                      <span className="text-gray-300 ml-2">per service</span>
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-2">
                      {renderStars(Math.round(averageRating))}
                      <span className="text-gray-300">
                        {averageRating.toFixed(1)} ({reviews.length} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="p-8 space-y-8">
                    <div className="text-center">
                      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Book Your Service</h2>
                      <p className="text-gray-600">Fill in the details below to schedule your appointment</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-900">Select Date</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              data-empty={!values.date}
                              className="data-[empty=true]:text-gray-500 w-full justify-start text-left font-normal h-14 border-2 border-gray-200 hover:border-black bg-white text-base"
                            >
                              <CalendarIcon className="mr-3 h-5 w-5" />
                              {values.date ? format(new Date(values.date), "PPP") : <span>Choose your date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={values.date ? new Date(values.date) : undefined}
                              onSelect={(d) => setFieldValue("date", d)}
                            />
                          </PopoverContent>
                        </Popover>
                        {errors.date && touched.date && (
                          <div className="text-red-500 text-sm font-medium">{errors.date}</div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-900">Select Time</label>
                        <Select onValueChange={(val) => setFieldValue("timing", val)}>
                          <SelectTrigger className="w-full h-14 border-2 border-gray-200 hover:border-black text-base">
                            <SelectValue placeholder="Choose time slot" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Available Times</SelectLabel>
                              <SelectItem value="9AM - 10AM">9:00 AM - 10:00 AM</SelectItem>
                              <SelectItem value="10AM - 11AM">10:00 AM - 11:00 AM</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {errors.timing && touched.timing && (
                          <div className="text-red-500 text-sm font-medium">{errors.timing}</div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-gray-900">Service Location</label>
                      <Input
                        name="location"
                        value={values.location}
                        onChange={handleChange}
                        className="h-14 border-2 border-gray-200 hover:border-black focus:border-black text-base"
                        placeholder="Enter your complete address"
                      />
                      {errors.location && touched.location && (
                        <div className="text-red-500 text-sm font-medium">{errors.location}</div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-gray-900">Contact Number</label>
                      <Input
                        type="tel"
                        name="phonenumber"
                        value={values.phonenumber}
                        onChange={handleChange}
                        className="h-14 border-2 border-gray-200 hover:border-black focus:border-black text-base"
                        placeholder="Enter your phone number"
                      />
                      {errors.phonenumber && touched.phonenumber && (
                        <div className="text-red-500 text-sm font-medium">{errors.phonenumber}</div>
                      )}
                    </div>

                    {/* Order Summary Section */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
                      <div className="flex justify-between items-center text-lg">
                        <span className="text-gray-700">{values.service}</span>
                        <span className="font-bold text-black">रु {values.price}</span>
                      </div>
                      {values.date && values.timing && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="text-sm text-gray-600">
                            <p>
                              <strong>Date:</strong> {format(new Date(values.date), "MMM dd, yyyy")}
                            </p>
                            <p>
                              <strong>Time:</strong> {values.timing}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-16 bg-black hover:bg-gray-800 text-white font-semibold text-lg rounded-lg"
                    >
                      Confirm Booking - रु {values.price}
                    </Button>

                    <div className="text-center text-sm text-gray-500">
                      <p>✓ Secure booking • ✓ Professional service • ✓ 24/7 support</p>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>

          {/* Customer Reviews Section */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-50 p-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Customer Reviews</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {renderStars(Math.round(averageRating))}
                  <span className="text-lg font-semibold">{averageRating.toFixed(1)}</span>
                </div>
                <span className="text-gray-600">Based on {reviews.length} reviews</span>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {reviews.map((item) => (
                <div key={item.id} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        {item.verified && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Verified</span>
                        )}
                      </div>
                      {renderStars(item.rating)}
                    </div>
                    <span className="text-sm text-gray-500">{format(new Date(item.date), "MMM dd, yyyy")}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{item.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Write a Review Section */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-50 p-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900">Write a Review</h2>
              <p className="text-gray-600 mt-1">Share your experience with this service</p>
            </div>

            <div className="p-6">
              <Formik
                initialValues={{
                  rating: 0,
                  comment: "",
                  name: localData?.name || "",
                  providerId: id
                }}
                validationSchema={ReviewSchema}
                onSubmit={async (values, { resetForm }) => {
                  axios.post('http://localhost:8080/submitreviews', values)
                  toast("Review submitted successfully!")
                  console.log("Review submitted:", values)
                  resetForm()
                }}
              >
                {({ values, errors, touched, setFieldValue, handleChange }) => (
                  <Form className="space-y-6">
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-gray-900">Your Name</label>
                      <Input
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        className="h-12 border-2 border-gray-200 hover:border-black focus:border-black"
                        placeholder="Enter your name"
                      />
                      {errors.name && touched.name && (
                        <div className="text-red-500 text-sm font-medium">{errors.name}</div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-gray-900">Rating</label>
                      <div className="flex items-center gap-2">
                        {renderStars(values.rating, true, (rating) => setFieldValue("rating", rating))}
                        <span className="text-sm text-gray-600 ml-2">
                          {values.rating > 0 && `${values.rating} star${values.rating > 1 ? "s" : ""}`}
                        </span>
                      </div>
                      {errors.rating && touched.rating && (
                        <div className="text-red-500 text-sm font-medium">{errors.rating}</div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-gray-900">Your Review</label>
                      <Textarea
                        name="comment"
                        value={values.comment}
                        onChange={handleChange}
                        className="min-h-32 border-2 border-gray-200 hover:border-black focus:border-black resize-none"
                        placeholder="Tell others about your experience with this service..."
                      />
                      {errors.comment && touched.comment && (
                        <div className="text-red-500 text-sm font-medium">{errors.comment}</div>
                      )}
                    </div>

                    <Button type="submit" className="w-full h-12 bg-black hover:bg-gray-800 text-white font-semibold">
                      Submit Review
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default BookServices
