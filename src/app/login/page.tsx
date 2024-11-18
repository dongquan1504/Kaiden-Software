"use client"

import { useRouter } from 'next/navigation';
import { useRef, useEffect } from 'react'
import * as Yup from "yup";
import { Controller } from 'react-hook-form';

import useForm from '@/hooks/useForm';
import { useAppSelector, useAppDispatch, useAppStore } from '@/lib/hooks'
import {
  initializeUser,
  setUser,
  UserProp,
} from '@/lib/features/user/userSlice'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import StoreProvider from '../StoreProvider';

const fakeUserData = [{ name: "leo@gmail.com", password: "123" }]

const initialValues = {
  name: "",
  password: "",
}

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  password: Yup.string().required('Password is required'),
});

const ProductName = ({ user }: { user: UserProp }) => {
  // Initialize the store with the product information
  const router = useRouter();
  const store = useAppStore()

  const { handleSubmit, register, control, formState: { errors } } = useForm<UserProp>(
    schema,
    initialValues,
  );

  const name = useAppSelector((state) => state.user?.name)
  console.log(name)

  const dispatch = useAppDispatch()

  const onSubmit = (data: any) => {
    if (!fakeUserData.map((i: any) => i.name).includes(data.name)) return;
    if (!fakeUserData.map((i: any) => i.password).includes(data.password)) return;

    router.push('/');
    dispatch(setUser(data));
  }

  // useEffect(() => {
  //   dispatch(initializeUser(null));
  // }, [])

  return (
    <StoreProvider >
      <div className="flex items-center justify-center min-h-screen">
        <form className="space-y-8 bg-white p-6 rounded shadow-md">
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
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => <Input {...field} id="password" className="col-span-3" type='password' {...register("password")} />}
            />
            {errors.password && (<><div /><span className="text-red-500 col-span-3 text-sm mt-[-8px]">{errors.password.message}</span></>)}
          </div>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>Submit Form</Button>
        </form>
      </div>
    </StoreProvider>
  )
}

export default ProductName;