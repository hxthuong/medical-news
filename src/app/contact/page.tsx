"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import useTranslate from "@/hooks/useTranslate";
import Loading from "@/components/loading";
import { useHeader } from "@/context/header";

export default function Contact() {
  const { setHeader, locale } = useHeader();

  const [nameFAQ, setNameFAQ] = useState("");
  const [phoneFAQ, setPhoneFAQ] = useState("");
  const [emailFAQ, setEmailFAQ] = useState("");
  const [addressFAQ, setAddressFAQ] = useState("");
  const [contentFAQ, setContentFAQ] = useState("");

  const {
    infoSite,
    workingTimeKey,
    contentKey,
    sendMessageKey,
    fullNameKey,
    phoneKey,
    addressKey,
  } = useTranslate(locale);

  useEffect(() => {
    setHeader({
      image: "/images/banner1.jpg",
      title: locale === "eng" ? "Contacts" : "Liên hệ",
    });
  }, [setHeader]);

  if (!infoSite) return <Loading />;

  return (
    <div className="w-full px-10 my-6">
      <div className="grid grid-cols-2 gap-5">
        <div
          className="relative w-full rounded-2xl bg-cover bg-center p-6 md:p-10"
          style={{ backgroundImage: "url('/images/bg1.jpg')" }}
        >
          <h3 className="text-blue-800 uppercase text-3xl font-semibold mb-4">
            {locale === "eng"
              ? "Send us message"
              : "Để lại lời nhắn cho chúng tôi"}
          </h3>

          <div className="mt-5 grid grid-cols-2 gap-5">
            <input
              className="form-input"
              type="text"
              placeholder={`${fullNameKey} *`}
            />
            <input
              className="form-input"
              type="text"
              placeholder={`${phoneKey} *`}
            />
            <input className="form-input" type="text" placeholder="Email *" />
            <input
              className="form-input"
              type="text"
              placeholder={addressKey}
            />
          </div>

          <textarea
            className="form-input mt-5 resize-none"
            placeholder={`${contentKey}...`}
            rows={5}
          />

          <button className="text-white max-w-45 mt-3 flex items-center justify-center bg-blue-700 font-semibold p-4 rounded-3xl hover:bg-white hover:text-blue-700">
            {sendMessageKey}
          </button>
        </div>
        <div>
          <h3 className="text-blue-800 border-b border-b-blue-800 pb-3 uppercase text-2xl font-semibold mb-4">
            {locale === "eng" ? "Contacts" : "Liên hệ"}
          </h3>
          <div>
            <h4 className="text-gray-500 pb-2 text-2xl font-semibold">
              {workingTimeKey}
            </h4>
            <div className="flex flex-row space-x-5 items-center">
              <Clock className="text-blue-700" width={35} height={35} />
              <div className="">
                <p className="text-lg text-gray-400">
                  {locale === "eng" ? "Monday - Saturday" : "Thứ 2 - Thứ 7"}
                </p>
                <p className="text-xl font-semibold">7:00 - 17:00</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-gray-500 pb-2 text-2xl font-semibold mt-4">
              {locale === "eng" ? "Info contact" : "Thông tin liên hệ"}
            </h4>
            <div className="flex flex-col space-x-5 space-y-2 text-lg">
              <div className="flex flex-row space-x-5 items-center">
                <MapPin className="text-blue-700" width={35} height={35} />
                <div className="">
                  <p className="text-lg text-gray-400">{addressKey}</p>
                  <p className="text-xl font-semibold">{infoSite?.CDIACHI}</p>
                </div>
              </div>
              <div className="flex flex-row space-x-5 items-center">
                <Phone className="text-blue-700" width={35} height={35} />
                <div className="">
                  <p className="text-lg text-gray-400">{phoneKey}</p>
                  <p className="text-xl font-semibold">{infoSite?.CSDT}</p>
                </div>
              </div>
              <div className="flex flex-row space-x-5 items-center">
                <Mail className="text-blue-700" width={35} height={35} />
                <div className="">
                  <p className="text-lg text-gray-400">Email</p>
                  <p className="text-xl font-semibold">{infoSite?.CEMAIL}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3910.XXXXXXXXXXXX!2d107.5879583!3d16.4624384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3141a139c92dd779%3A0xcad91f43f5b0f411!2sB%E1%BB%87nh%20vi%E1%BB%87n%20Trung%20%C6%AF%C6%A1ng%20Hu%E1%BA%BF!5e0!3m2!1svi!2s!4vXXXXXXXXXXXX"
          width="100%"
          height="450"
          loading="lazy"
          className="rounded-2xl"
        ></iframe>
      </div>
    </div>
  );
}
