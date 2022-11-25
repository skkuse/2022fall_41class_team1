import axios from "axios";
import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const OAuth2LoginResult = () => {
  const [params] = useSearchParams();
  const accessToken = params.get("access_token");
  const GET_URL = "/api/user";
  const GET_USERINFO = `Authorization: Bearer ${accessToken}`;
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  })

  axios.get(GET_URL, {
    headers: GET_USERINFO,
  })
  .then((res) => {
    console.log(res.data);
  })
  return null;
};

export default OAuth2LoginResult;
