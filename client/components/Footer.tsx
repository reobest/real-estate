import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
const Footer = () => {
  return (
    <div className="flex w-full justify-center items-center gap-15 mt-32 py-4">
      <h3 className="text-xl font-semibold">BASECLUB</h3>
      <div className="flex items-center text-xs text-black/80 gap-2">
        <p className="cursor-pointer">About us</p>
        <p className="cursor-pointer">Contact us</p>
        <p className="cursor-pointer">FaQ</p>
        <p className="cursor-pointer">Terms</p>
        <p className="cursor-pointer">Privacy</p>
      </div>
      <div className="flex items-center gap-3">
        <FaFacebook />
        <AiFillInstagram />
        <FaTwitter />
        <FaLinkedin />
        <FaYoutube />
      </div>
      <p className="text-[10px] text-black/60">@all rights reserved Privacy Policy Terms of use Cookie Policy</p>
    </div>
  );
};

export default Footer;
