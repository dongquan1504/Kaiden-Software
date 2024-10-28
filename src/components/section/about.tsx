/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Image from "next/image";
import * as Yup from "yup";

import useForm from '@/hooks/useForm';
import icon from "@/assets/images/icon.png";
import { Button } from "@/components/ui/button";
import DialogCustome, { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import BookingForm from "@/components/common/bookingform";

interface IBookingForm {
  name: string;
  // username: string;
  // email: string;
  // phoneNumber: string;
  // services: { key: string; name: string }[];
}

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.string().required('Phone Number is required'),
  services: Yup.object().shape({
    key: Yup.string(),
    name: Yup.string(),
  }).required('Service is required'),
});

const initialValues = {
  name: "",
  username: "",
  email: "",
  phoneNumber: "",
  services: {
    key: "landing-web",
    name: "Landing Web"
  },
};

export default function About() {
  const { handleSubmit, ...res } = useForm<IBookingForm>(
    schema,
    initialValues,
  );

  const onSubmit = async (data: any): Promise<void> => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  };

  const labelDialog =
    <Button>
      <Image
        className="dark:invert"
        src="https://nextjs.org/icons/vercel.svg"
        alt="Vercel logomark"
        width={20}
        height={20}
      />
      Booking now
    </Button>

  const headerDialog = <>
    <DialogTitle>Booking Service</DialogTitle>
    <DialogDescription>
      We will contact soon after this form submit
    </DialogDescription>
  </>

  return (<>
    <Image
      className="dark:invert"
      src={icon}
      alt="Next.js logo"
      width={180}
      height={38}
      priority
    />
    <p className="text-center sm:text-left text-sm text-neutral-600 dark:text-neutral-400">
      <span className="font-semibold">Kaiden Software</span> Founded in 2023, Kaiden is a forward-thinking company specializing in providing cutting-edge software services.
    </p>
    <p className="text-center sm:text-left text-sm text-neutral-600 dark:text-neutral-400">
      We focus on two primary areas: web design and game development. Our expert team is dedicated to delivering innovative solutions that meet the evolving needs of businesses and entertainment industries alike. Whether it’s crafting user-friendly websites or building immersive gaming experiences, Kaiden is committed to excellence in every project.
    </p>

    <div className="flex gap-4 items-center flex-col sm:flex-row">
      <DialogCustome label={labelDialog}
        header={headerDialog}
        content={<BookingForm useForm={res} />}
        footer={<Button type="submit" onClick={handleSubmit(onSubmit)}>Submit Form</Button>}
      />
      <a
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
        href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Read our docs
      </a>
    </div></>
  );
}