import { useEffect, useState } from "react";
import Input_ from "../Input_";
import axios from "../../api/axios";
import Dropdown_ from "../Dropdown_";

type dropdownOptionProps = {
  name: string;
  value: string;
  emoji?: string;
};

type countrySearchProps = {
  handleCountryValue: (prop: dropdownOptionProps) => void;
};

function CountrySearch({ handleCountryValue }: countrySearchProps) {
  const [countryInput, setCountryInput] = useState<string>("");
  const [countryDropdownData, setCountryDropdownData] = useState<
    dropdownOptionProps[]
  >([]);

  const handleCountryChange = (newValue: string) => {
    setCountryInput(newValue);
  };

  const getCountryData = async () => {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    const mappedData = response.data.map((country: any) => ({
      name: country.name.common,
      value: country.flag,
      emoji: country.flag,
    }));
    mappedData.sort((a: any, b: any) => a.name.localeCompare(b.name));
    setCountryDropdownData(mappedData);
  };

  const filterCountries = (inputValue: string) => {
    return countryDropdownData.filter((country) =>
      country.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const handleCountryPick = (action: string, name?: string) => {
    console.log(action, name);
    if (name)
      handleCountryValue({
        value: action,
        name,
      });
  };

  useEffect(() => {
    getCountryData();
  }, []);

  return (
    <>
      <Input_
        id="Author"
        label=""
        className="bg-dark-saturated"
        placeholder="Country"
        onChange={handleCountryChange}
      ></Input_>
      <Dropdown_
        className="w-full shadow-lg"
        open={countryInput ? true : false}
        dropDowns={filterCountries(countryInput)}
        handleAction={handleCountryPick}
        wide
      ></Dropdown_>
    </>
  );
}

export default CountrySearch;
