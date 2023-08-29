import { Select } from "antd";
import { useEffect, useState } from "react";
import api from "../../json-server/api";

export const SelectCategoryOpt = ({ formik }) => {
  const [allLocation, setAllLocation] = useState([]);
  const [locationName, setLocationName] = useState("");

  const fetchLocation = async (location_name = "") => {
    await api
      .get(`/category/q?category=${location_name}`)
      .then((result) => setAllLocation(result.data));
  };

  const { Option } = Select;
  function onChange(value) {
    formik.values.location = value;
  }
  function onBlur() {
    setLocationName("");
  }
  function onFocus() {}
  function onSearch(val) {
    setLocationName(val);
  }

  useEffect(() => {
    fetchLocation();
  }, []);
  useEffect(() => {
    const debounce = setTimeout(() => fetchLocation(locationName), 500);
    return () => clearTimeout(debounce);
  }, [locationName]);

  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Select a person"
      optionFilterProp="children"
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onSearch={onSearch}
      filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {allLocation.map((val, index) => (
        <Option value={val.id}>{val.location_name}</Option>
      ))}
    </Select>
  );
};
