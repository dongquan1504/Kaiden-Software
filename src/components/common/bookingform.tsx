/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { memo } from 'react';
import { Controller } from 'react-hook-form';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Select from "../ui/select";

interface BookingFormProp {
  useForm: any;
}

const services = [{
  key: "landing-web",
  name: "Landing Web"
}, {
  key: "website",
  name: "Website"
}, {
  key: "triple-a",
  name: "Triple A Game"
}, {
  key: "indie",
  name: "Indie Game"
}]

const BookingForm = ({ useForm }: BookingFormProp) => {
  const { register, control, formState: { errors } } = useForm;

  return (
    // <FormProvider {...useForm}>
    // <Form {...useForm}>
    <form className="space-y-8">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input {...field} id="name" className="col-span-3" {...register("name")} />}
        />
        {errors.name && (<><div /><span className="text-red-500 col-span-3 text-sm mt-[-8px]">{errors.name.message}</span></>)}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          Username
        </Label>
        <Controller
          name="username"
          control={control}
          render={({ field }) => <Input {...field} id="username" className="col-span-3" {...register("username")} />}
        />
        {errors.username && (<><div /><span className="text-red-500 col-span-3 text-sm mt-[-8px]">{errors.username.message}</span></>)}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="email" className="text-right">
          Email
        </Label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input {...field} id="email" className="col-span-3" {...register("email")} />}
        />
        {errors.email && (<><div /><span className="text-red-500 col-span-3 text-sm mt-[-8px]">{errors.email.message}</span></>)}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="phoneNumber" className="text-right">
          Phone Number
        </Label>
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => <Input {...field} type="tel" id="phoneNumber" className="col-span-3" {...register("phoneNumber")} />}
        />
        {errors.phoneNumber && (<><div /><span className="text-red-500 col-span-3 text-sm mt-[-8px]">{errors.phoneNumber.message}</span></>)}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="services" className="text-right">
          Services
        </Label>
        <Controller
          name="services"
          control={control}
          render={({ field }) => (
            <Select
              formFieldProps={field}
              placeholder="Select services"
              items={services}
            // {...register("services")}
            // className="col-span-3"
            />
          )}
        />
        {errors.services && <span>{errors.services.message}</span>}
      </div>
    </form>
    // </Form>
    // </FormProvider>
  );
};

export default memo(BookingForm);