import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Read = () => {
  const [APIData, setAPIData] = useState([]);
  const [search, setSearch] = useState("");
  const [dateSearch, setDateSearch] = useState("");
  const [dateSearchEnd, setDateSearchEnd] = useState("");
  const [sortedData, setSortedData] = useState([]);
  useEffect(() => {
    axios
      .get(`https://65eb516543ce16418933af30.mockapi.io/fakeData`)
      .then((ressponse) => {
        setAPIData(ressponse.data);
        setSortedData(ressponse.data.slice());
      });
  }, []);

  const setData = (data) => {
    let { id, firstName, lastName, checkbox, date } = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("First Name", firstName);
    localStorage.setItem("Last Name", lastName);
    localStorage.setItem("Date", date);
    localStorage.setItem("Checkbox Value", checkbox);
  };
  const getData = () => {
    axios
      .get(`https://65eb516543ce16418933af30.mockapi.io/fakeData`)
      .then((getData) => setAPIData(getData.data));
  };
  const onDelete = (id) => {
    axios
      .delete(`https://65eb516543ce16418933af30.mockapi.io/fakeData/${id}`)
      .then(() => getData());
  };
  const dataSort = (sortByName) => {
    const copyData = sortedData.slice();
    copyData.sort((a, b) => {
      if (a[sortByName] > b[sortByName]) {
        return 1;
      }
      if (a[sortByName] < b[sortByName]) {
        return -1;
      }
      return 0;
    });
    setSortedData(copyData);
    setAPIData(copyData.slice());
  };
  return (
    <>
      <div>
        <Input
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <div>
          <label htmlFor="">Start Date</label>
          <Input
            placeholder="Search..."
            onChange={(e) => {
              setDateSearch(e.target.value);
            }}
            type="date"
            value={dateSearch}
          />
          <label htmlFor="">End Date</label>
          <Input
            placeholder="Search..."
            onChange={(e) => {
              setDateSearchEnd(e.target.value);
            }}
            type="date"
            value={dateSearchEnd}
          />
        </div>

        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                First Name{" "}
                <Button
                  onClick={() => {
                    dataSort("firstName");
                  }}
                >
                  Sort
                </Button>
              </Table.HeaderCell>
              <Table.HeaderCell>
                Last Name{" "}
                <Button
                  onClick={() => {
                    dataSort("lastName");
                  }}
                >
                  Sort
                </Button>
              </Table.HeaderCell>
              <Table.HeaderCell>Checked</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Update</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {APIData.filter((data) => {
              const searchMatch =
                search.toLowerCase() === ""
                  ? data
                  : data.firstName.toLowerCase().includes(search);

              // Parse user-provided dates (if available)
              const startDate = dateSearch ? new Date(dateSearch) : null;
              const endDate = dateSearchEnd ? new Date(dateSearchEnd) : null;
              const parsedDate = new Date(data.date);
              // Check for start date match (if provided)
              const startDateMatch = startDate ? parsedDate >= startDate : true;

              // Check for end date match (if provided)
              const endDateMatch = endDate ? parsedDate <= endDate : true;

              // Combine filters: all conditions must be met
              return searchMatch && startDateMatch && endDateMatch;
            }).map((data) => {
              return (
                <Table.Row>
                  <Table.Cell>{data.firstName}</Table.Cell>
                  <Table.Cell>{data.lastName}</Table.Cell>
                  <Table.Cell>{data.date}</Table.Cell>
                  <Table.Cell>
                    {data.checkbox ? "Checked" : "Unchecked"}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to="/update">
                      <Button
                        onClick={() => {
                          setData(data);
                        }}
                      >
                        Update
                      </Button>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Button onClick={() => onDelete(data.id)}>Delete</Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}{" "}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default Read;
