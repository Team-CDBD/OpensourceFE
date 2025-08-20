/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Layout
import DashboardLayout from "layouts/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/Navbars/DashboardNavbar";
import Footer from "layouts/Footer";

function KafkaConfiguration() {
  // 샘플 데이터
  const [topics, setTopics] = useState([
    { name: "topic-1", partCnt: 3, createdDt: 2, description: "설명" },
    { name: "topic-2", partCnt: 1, createdDt: 1, description: "설명" },
    { name: "topic-3", partCnt: 5, createdDt: 3, description: "설명" },
    { name: "topic-4", partCnt: 2, createdDt: 1, description: "설명" },
    { name: "topic-5", partCnt: 3, createdDt: 2, description: "설명" },
    { name: "topic-6", partCnt: 2, createdDt: 2, description: "설명" },
    { name: "topic-7", partCnt: 4, createdDt: 1, description: "설명" },
    { name: "topic-8", partCnt: 1, createdDt: 1, description: "설명" },
    { name: "topic-9", partCnt: 6, createdDt: 3, description: "설명" },
    { name: "topic-10", partCnt: 2, createdDt: 1, description: "설명" },
    { name: "topic-11", partCnt: 3, createdDt: 2, description: "설명" },
  ]);

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // 페이지네이션 데이터 slice
  const paginatedTopics = topics.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // 버튼 이벤트 핸들러 (샘플)
  const handleConnect = () => {
    alert("연결 테스트 실행");
  };

  const handleCreate = async () => {
    try {
      if (!newRow.name?.trim()) {
        alert("토픽 이름을 입력하세요");
        return;
      }
      const params = new URLSearchParams({
        name: newRow.name.trim(),
        partitions: String(newRow.partCnt),
        replication: String(newRow.replFactor),
        retentionMs: String(newRow.retentionMs),
      });

      const res = await fetch(`/logs/create-topic`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: params.toString(),
      });
      if (!res.ok) throw new Error(await res.text());
      alert("생성되었습니다");
      await fetchTopics();
    } catch (e) {
      console.error(e);
      alert("생성에 실패했습니다");
    }
  };

  const handleUpdate = () => {
    alert("토픽 수정 실행");
  };

  const handleDelete = () => {
    alert("토픽 삭제 실행");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox p={4}>
        {/* 버튼 영역 */}
        <Grid container spacing={2} mb={2}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleConnect}>
              연결 테스트
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="success" onClick={handleCreate}>
              생성
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="warning" onClick={handleUpdate}>
              수정
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="error" onClick={handleDelete}>
              삭제
            </Button>
          </Grid>
        </Grid>

        {/* 테이블 영역 */}
        <TableContainer component={Paper}>
          <Table
            sx={{
              "& th, & td": {
                textAlign: "center",
                verticalAlign: "middle",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" sx={{ width: 56 }}>
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Checkbox />
                  </Box>
                </TableCell>
                <TableCell>토픽</TableCell>
                <TableCell>파티션 수</TableCell>
                <TableCell>생성 날짜</TableCell>
                <TableCell>description</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedTopics.map((topic, idx) => (
                <TableRow key={idx}>
                  <TableCell padding="checkbox" sx={{ p: 0 }}>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <Checkbox />
                    </Box>
                  </TableCell>
                  <TableCell>{topic.name}</TableCell>
                  <TableCell>{topic.partCnt}</TableCell>
                  <TableCell>{topic.createdDt}</TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: 320,
                    }}
                    title={topic.description}
                  >
                    {topic.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* 페이지네이션 */}
        <MDBox mt={2} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(topics.length / rowsPerPage)}
            page={page}
            onChange={handlePageChange}
            shape="rounded"
            color="primary"
          />
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default KafkaConfiguration;
