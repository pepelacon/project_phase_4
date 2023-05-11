import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function EditPost({setToggle, toggle}) {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const formSchema = yup.object().shape({
    title: yup.string().required("Must enter a title"),
    budget: yup.number().positive(),
  });
  const navigate = useNavigate();


  useEffect(() => {
    fetch(`/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => setError(err));
  }, [id]);
  console.log(post);
  const formik = useFormik({
    initialValues: {
      title: post?.title || "",
      category: post?.category || "",
      image: post?.image || "",
      description: post?.description || ""
  
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch(`/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      })
        .then((res) => {
          if (res.ok) {
            res.json().then((post) => {
              console.log("Post updated successfully!", post);
            });
          } else {
            res.json().then((error) => {
              console.error("Failed to update post!", error);
            });
          }
          setToggle(!toggle)
          navigate(`/profile`)
        })
        .catch((err) => {
          console.error("An error occurred while updating post!", err);
        });
    },
  });

  if (error) {
    return <div>Failed to fetch post!</div>;
  }

  if (!post) {
    return <div>Loading post...</div>;
  }

  return (
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <label>Title </label>
        <input
          type="text"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        <label> Category</label>
        <select
          className="form-input"
          name="category"
          id="category"
          onChange={formik.handleChange}
          value={formik.values.category}
        >
          <option value="">Pick a Category</option>
          <option value="Home Goods">Home Goods</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Sports">Sports</option>
          <option value="Books">Books</option>
          <option value="Outdoors">Outdoors</option>
        </select>

        <label>Image</label>
        <input
          type="text"
          name="image"
          value={formik.values.image}
          onChange={formik.handleChange}
        />

        <label>Description</label>
        <textarea
          type="text"
          rows="4"
          cols="50"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
        />

        <input type="submit" />
      </form>
  );
}

export default EditPost;