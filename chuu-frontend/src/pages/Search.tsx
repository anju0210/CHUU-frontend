import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar.tsx";
import def from "../styles/Default.module.css";
import style from "../styles/Search.module.css";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { IoIosArrowBack } from "react-icons/io";
import teacherData from "../assets/teachers.json";
import { useNavigate } from "react-router-dom";

type TeacherType = {
  name: string;
  photo: string;
  personality: string;
  hashtags: string[];
};

function Search({}) {
  const [search, setSearch] = useState<string>("");
  const [teachers, setTeachers] = useState<TeacherType[]>([]);
  const [originalTeachers, setOriginalTeachers] = useState<TeacherType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTeachers(teacherData.teachers);
    setOriginalTeachers(teacherData.teachers);
  }, []);

  const onChange = (value: string) => {
    setSearch(value);
    searchResult(value);
  };

  const searchResult = (value: string) => {
    if (value === "") {
      setTeachers(originalTeachers);
      return;
    }

    const searchedResult = originalTeachers.filter(
      (teacher: TeacherType) =>
        teacher.name.includes(value) ||
        teacher.hashtags.some((hashtag) => hashtag.includes(value))
    );

    setTeachers(searchedResult);
  };

  const returnBack = () => {
    navigate("/");
  };

  return (
    <div className={`${def["Body"]}`}>
      <div className={`${style["SearchDiv"]}`}>
        <div onClick={returnBack}>
          <IoIosArrowBack size="25px" />
        </div>
        <SearchBar value={search} onChange={onChange} />
      </div>
      {search == "" ? (
        <div className={`${style["RecommandSearch"]}`}>
          <p>추천 검색어</p>
        </div>
      ) : (
        <div className={`${style["SearchResult"]}`}>
          {(teachers as TeacherType[]).map((teacher) => (
            <div>
              <div>
                <img src={teacher.photo} />
              </div>
              <div>
                <p>{teacher.name}</p>
                <p>{teacher.personality}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
