import React from 'react'
// import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useFormik } from "formik"
import * as yup from "yup"

function PostForm({userId, setToggle, toggle}) {
  const navigate = useNavigate();
  const formSchema = yup.object().shape({
    title: yup.string().required("Must enter a title"),
    budget: yup.number().positive()
  })
  console.log(userId);
  const formik = useFormik({
    initialValues: {
      title:'',
      category:'',
      image:'',
      description:'',
      user_id: userId,
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((res) => {
        if(res.ok) {
          res.json().then(post => {
            setToggle(!toggle)
            navigate(`/`)
          })
        }
      })
    },
  })
    return (
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <label>Title </label>
        <input type='text' name='title' value={formik.values.title} onChange={formik.handleChange} />
        
        <label> Category</label>
        <input type='text' name='category' value={formik.values.category} onChange={formik.handleChange} />
      
        <label>Image</label>
        <input type='text' name='image' value={formik.values.image} onChange={formik.handleChange} />
      
        {/* <label>user_id</label>
        <input type='text' name='user_id' value={formik.values.user_id} onChange={formik.handleChange} /> */}
      
        <label>Description</label>
        <textarea type='text' rows='4' cols='50' name='description' value={formik.values.description} onChange={formik.handleChange} />
      
        <input type='submit' />
      </form> 
      
    )
  }
  
  export default PostForm