import React from "react";
import axios from 'axios';
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import EnquiryList from "./enquirycomponents/EnquiryList";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js' 

export default function Enquiry() {
const baseURL = import.meta.env.VITE_API_URL;
  let [enquiryList, setEnquiryList]=useState([])
  let [formData, setFormData]=useState({
    name:'',
    email:'',
    phone:'',
    message:'',
    _id:''
  })

  const saveEnquiry = (e) => {
    e.preventDefault();
    
    let formData={
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      message: e.target.message.value
    }

    if(formData._id){
      axios.put(`${baseURL}/api/website/enquiry/update/${formData._id}`, formData).then((res)=>{
      toast.success("Enquiry updated successfully")
      setFormData({
          name:'',
          email:'',
          phone:'',
          message:'',
          _id:''
      })
      getAllenquiry()
    })
    }else{
      axios.post(`${baseURL}/api/website/enquiry/insert`, formData).then((res)=>{
      console.log(res.data)
      toast.success("Enquiry saved successfully")
      setFormData({
          name:'',
          email:'',
          phone:'',
          message:''
      })
      getAllenquiry()
    })
    }

  };

  let getAllenquiry = () => {
  axios.get(`${baseURL}/api/website/enquiry/view`)
  .then((res) => {
    if (res.data.status === 1) {
      setEnquiryList(res.data.data); 
    } else {
      setEnquiryList([]); 
    }
  })
  .catch((err) => {
    console.error("Error fetching enquiries:", err);
    setEnquiryList([]);
  });
};

  const getValue = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};

useEffect(()=>{
  getAllenquiry()
},[])
  return (
    <div className="p-6">
      <ToastContainer />
      <h1 className="text-[40px] text-center py-6 font-bold">User Enquiry</h1>

      <div className="grid grid-cols-[30%_70%] gap-10 sm:grid-cols-2">
        <div className="bg-gray-200 p-6 rounded-lg shadow-md">
          <h2 className="text-[20px] font-bold mb-4">Enquiry Form</h2>
          <form onSubmit={saveEnquiry} className="space-y-4">
            <div>
              <Label htmlFor="name" value="Your Name" />
              <TextInput type="text" value={formData.name} onChange={getValue} name="name" placeholder="Enter Your Name" required />
            </div>
            <div>
              <Label htmlFor="email" value="Your Email" />
              <TextInput type="email" value={formData.email} onChange={getValue} name="email" placeholder="Enter Your Email" required />
            </div>
            <div>
              <Label htmlFor="phone" value="Your Phone" />
              <TextInput type="text" value={formData.phone} onChange={getValue} name="phone" placeholder="Enter Your Phone" required />
            </div>
            <div>
              <Label htmlFor="message" value="Your Message" />
              <Textarea id="message" value={formData.message} onChange={getValue} name="message" placeholder="Enter your message..." rows={4} required />
            </div>
            <Button type="submit" color="gray" className="w-full mt-2">
              {formData._id ? 'Update' : 'Save'}
            </Button>
          </form>
        </div>
        <EnquiryList data={enquiryList} getAllenquiry={getAllenquiry} Swal={Swal} setFormData={setFormData} />
      </div>
    </div>
  );
}
