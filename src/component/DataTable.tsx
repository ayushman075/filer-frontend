import React, { useState, useEffect } from "react";
import { Table, Input, Space } from "antd";
import axiosInstance from "@/utils/axiosConfig";
import UserDetail from "./UserDetail";
import { replace, useNavigate } from "react-router-dom";


const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ field: "createdAt", order: "descend" });
  const [selectedData, setSelectedData] = useState(null);
const navigate=useNavigate();
  useEffect(() => {
    fetchData();
  }, [pagination.current, pagination.pageSize, search, sort]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`file/getAll`, {
        params: {
          page: pagination.current,
          limit: pagination.pageSize,
          sort: sort.field,
          order: sort.order === "ascend" ? "asc" : "desc",
          search,
        },
      });

      const { data, total } = response.data.data;
      setData(data);
      setPagination((prev) => ({ ...prev, total }));
    } catch (error) {
      if(error?.status==401){
        navigate('/login',{replace:true})
      }
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
    setSort({ field: sorter.field || "createdAt", order: sorter.order || "descend" });
  };

  return (
    <div className="m-4">
      {/* Search Input */}
      <Space style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Search by Name"
          onSearch={(value) => setSearch(value)}
          enterButton
          allowClear
        />
      </Space>

      {/* Data Table */}
      <Table
        columns={[
          { title: "Name", dataIndex: "name", key: "name", sorter: true },
          { title: "Mobile", dataIndex: "mobilePhone", key: "mobilePhone" },
          { title: "PAN", dataIndex: "pan", key: "pan" },
          { title: "Credit Score", dataIndex: "creditScore", key: "creditScore", sorter: true },
          { title: "Active Accounts", dataIndex: ["reportSummary", "activeAccounts"], key: "activeAccounts" },
          { title: "Closed Accounts", dataIndex: ["reportSummary", "closedAccounts"], key: "closedAccounts" },
          { 
            title: "Created At", 
            dataIndex: "createdAt", 
            key: "createdAt", 
            sorter: true,
            render: (record) => <div>{new Date(record).toLocaleString()}</div>
          },
          {
            title: "Action",
            key: "action",
            render: (_, record) => (
              <button 
                onClick={() => setSelectedData(record)} 
                className="text-blue-600 hover:underline">
                View Details
              </button>
            ),
          }
        ]}
        rowKey="_id"
        dataSource={data}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />

      {/* Dialog for Details */}
      <UserDetail selectedData={selectedData} onClose={() => setSelectedData(null)} />
    </div>
  );
};

export default DataTable;
