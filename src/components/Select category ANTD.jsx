import { Select } from "antd";
import { useEffect, useState } from "react";
import api from "../json-server/api";

export const SelectCategoryOpt = ({ formik, setCategory }) => {
  const [allCategory, setAllCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const fetchCategory = async (category = "") => {
    await api
      .get(`/event_categories/q?category=${category}`)
      .then((result) => setAllCategory(result.data));
  };

  const { Option } = Select;
  function onChange(value) {
    formik.setFieldValue(`category`, Number(String(value).split(`--`)[0]));
    setCategory(String(value).split(`--`)[1]);
  }
  function onBlur() {
    // setCategory("");
  }
  function onFocus() {}
  function onSearch(val) {
    setCategory(val);
  }

  useEffect(() => {
    fetchCategory(categoryName);
  }, []);
  useEffect(() => {
    const debounce = setTimeout(() => fetchCategory(categoryName), 500);
    return () => clearTimeout(debounce);
  }, [categoryName]);

  return (
    <Select
      showSearch
      style={{ width: 200, textTransform: "capitalize" }}
      placeholder="Select a person"
      optionFilterProp="children"
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onSearch={onSearch}
      filterOption={(input, option) =>
        option?.props?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {allCategory.map((val, index) => (
        <Option value={val.id + `--` + val.category} key={index}>
          {val.category}
        </Option>
      ))}
    </Select>
  );
};
