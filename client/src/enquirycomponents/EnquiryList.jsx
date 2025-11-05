import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function EnquiryList({data=[],getAllenquiry,Swal,setFormData}) {
  const baseURL = import.meta.env.VITE_API_URL; 
  
  let deleteRow=(delid)=>{

    Swal.fire({
      title: "Do you want to delete the data?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save"
    }).then((result) => {
  if (result.isConfirmed) {
        axios.delete(`${baseURL}/api/website/enquiry/delete/${delid}`)
    .then((res)=>{
      toast.success("Enquiry deleted successfully")
      getAllenquiry()
    })
    Swal.fire("Saved!", "", "success");
  } else if (result.isDenied) {
    Swal.fire("Changes are not saved", "", "info");
  }
});

  }

  let editRow=(editid)=>{
    axios.get(`${baseURL}/api/website/enquiry/single/${editid}`)
    .then((res)=>{
      let data = res.data
      console.log(res.data)
      setFormData(res.data.findEnquiry);
    }).catch((err)=>console.log(err));
  }

  return (
    <div className="overflow-x-auto bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-[20px] font-bold mb-4">Enquiry List</h2>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Sr No</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Phone</TableHeadCell>
            <TableHeadCell>Message</TableHeadCell>
            <TableHeadCell>Delete</TableHeadCell>
            <TableHeadCell>Edit</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {
          data.length>=1 ?
          data.map((item,index)=>(
            <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell>{index+1}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.phone}</TableCell>
            <TableCell>{item.message}</TableCell>
            <TableCell>
                <button onClick={()=>deleteRow(item._id)} className="font-medium text-blue-600 hover:underline">Delete</button>
            </TableCell>
            <TableCell>
                <button onClick={()=>editRow(item._id)} className="font-medium text-blue-600 hover:underline">Edit</button>
            </TableCell>
             </TableRow>
          ))
          :
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell colSpan={7} className="text-center">No data found</TableCell>
          </TableRow>
        }
        </TableBody>
      </Table>
    </div>
  );
}
