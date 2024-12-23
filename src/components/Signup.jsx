import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  age: yup
    .number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(18, "You must be at least 18 years old")
    .max(100, "Age must not exceed 100 years"),
});

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "300px", margin: "0 auto" }}>
      <div style={{ marginBottom: "20px" }}>
        <label>Age:</label>
        <Controller
          name="age"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              type="number"
              placeholder="Enter your age"
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                border: errors.age ? "1px solid red" : "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          )}
        />
        {errors.age && (
          <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            {errors.age.message}
          </p>
        )}
      </div>
      <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
