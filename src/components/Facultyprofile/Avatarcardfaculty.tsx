import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import axios from "axios";

const FileInput = styled("input")({
  display: "none",
});

const Avatarcardfaculty: React.FC = () => {
  const [pic, setpic] = useState("");
  const handleChange = async (e: any) => {
    const token = localStorage.getItem("token");
    const file = e.target.files[0];
    if (!file) return;
    const fileData = new FormData();
    fileData.append("myfile", file);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/faculty/upload-photo",
        fileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setpic(response.data.updatedFaculty.profile);
    } catch (error) {
      console.log(error);
    }
  };

  // ==================== useEffect ===================
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:8000/api/faculty/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setpic(response.data.faculty[0].profile);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <Card>
      <CardContent>
        <Avatar alt="Remy Sharp" src={pic} sx={{ width: 200, height: 200 }} />
      </CardContent>
      <CardActions>
        <label htmlFor="contained-button-file">
          <FileInput
            accept="image/*"
            onChange={handleChange}
            id="contained-button-file"
            type="file"
          />
          <Button variant="outlined" component="span">
            Upload
          </Button>
        </label>
      </CardActions>
    </Card>
  );
};
export default Avatarcardfaculty;
