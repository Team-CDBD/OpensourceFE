import { useMemo, useState, useCallback, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import MDBox from "components/MDBox";
import DashboardLayout from "layouts/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/Navbars/DashboardNavbar";
import Footer from "layouts/Footer";

const FIELD_HEIGHT = 40;

const commonFieldSx = {
  "& .MuiOutlinedInput-root": {
    height: FIELD_HEIGHT,
    alignItems: "center",
  },
  "& .MuiOutlinedInput-input": {
    height: FIELD_HEIGHT,
    padding: "0 12px",
    boxSizing: "border-box",
  },
  "& .MuiSelect-select": {
    height: FIELD_HEIGHT,
    display: "flex",
    alignItems: "center",
    padding: "0 12px",
    boxSizing: "border-box",
  },
};

const commonLabelProps = {
  shrink: true,
  sx: {
    backgroundColor: "background.paper",
    px: 0.5,
    "&.MuiInputLabel-shrink": {
      top: 6,
    },
  },
};

function AlertSystemConfiguration() {
  const [channelType, setChannelType] = useState("DISCORD");
  const [botName, setBotName] = useState("");
  const [discordWebhookUrl, setDiscordWebhookUrl] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [savedList, setSavedList] = useState([]);

  const [query, setQuery] = useState("");

  const isDiscordWebhookValid = useMemo(() => {
    if (!discordWebhookUrl) return false;
    return /^https:\/\/discord\.com\/api\/webhooks\//.test(discordWebhookUrl);
  }, [discordWebhookUrl]);

  const isFormValid = useMemo(() => {
    if (!botName.trim()) return false;
    if (channelType === "DISCORD") return isDiscordWebhookValid;
    return false;
  }, [botName, channelType, isDiscordWebhookValid]);

  const buildSettings = useCallback(() => {
    if (channelType === "DISCORD") {
      return { webhookUrl: discordWebhookUrl.trim() };
    }
    return {};
  }, [channelType, discordWebhookUrl]);

  const handleSubmit = useCallback(async () => {
    setErrorMsg("");
    setSuccessMsg("");

    if (!isFormValid) {
      setErrorMsg("필수 항목을 확인해 주세요.");
      return;
    }

    const payload = {
      channelType,
      botName: botName.trim(),
      settings: buildSettings(),
    };

    try {
      setSubmitting(true);
      const res = await fetch("http://localhost:8080/api/channel-setting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }

      setSuccessMsg("채널 설정이 저장되었습니다.");
      fetchList();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  }, [channelType, botName, buildSettings, isFormValid]);

  const fetchList = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:8080/api/channel-setting");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setSavedList(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const renderChannelFields = () => {
    switch (channelType) {
      case "DISCORD":
        return (
          <Stack spacing={2}>
            <TextField
              label="Discord Webhook URL"
              placeholder="https://discord.com/api/webhooks/xxxx/yyyy"
              value={discordWebhookUrl}
              onChange={(e) => setDiscordWebhookUrl(e.target.value)}
              fullWidth
              size="small"
              variant="outlined"
              sx={commonFieldSx}
              InputLabelProps={commonLabelProps}
              error={!!discordWebhookUrl && !isDiscordWebhookValid}
              helperText={
                !discordWebhookUrl
                  ? "필수 입력"
                  : !isDiscordWebhookValid
                  ? "형식이 올바르지 않습니다."
                  : ""
              }
            />
          </Stack>
        );
      default:
        return null;
    }
  };

  const filteredList = useMemo(() => {
    return savedList.filter(
      (item) =>
        item.botName.toLowerCase().includes(query.toLowerCase()) ||
        item.channelType.toLowerCase().includes(query.toLowerCase())
    );
  }, [savedList, query]);

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox
        py={3}
        px={2}
        sx={{
          height: "calc(100vh - 128px)",
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        <Box sx={{ pb: 2, flexShrink: 0 }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            알럿 시스템 · 채널 설정
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Discord 채널 전송 설정을 등록합니다. 채널 타입에 따라 필요한 필드를 입력하세요.
          </Typography>
        </Box>

        <Grid container spacing={2} sx={{ flex: 1, minHeight: 0 }}>
          <Grid item xs={12} md={7} sx={{ display: "flex", minHeight: 0 }}>
            <Paper
              elevation={1}
              sx={{
                p: 2,
                borderRadius: 2,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                minHeight: "100%",
              }}
            >
              <Stack spacing={2} sx={{ flex: 1, minHeight: 0, overflow: "auto" }}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="stretch">
                  <TextField
                    select
                    fullWidth
                    size="small"
                    variant="outlined"
                    sx={commonFieldSx}
                    InputLabelProps={commonLabelProps}
                    label="채널 타입"
                    value={channelType}
                    onChange={(e) => setChannelType(e.target.value)}
                    helperText="현재는 DISCORD만 지원합니다."
                  >
                    <MenuItem value="DISCORD">DISCORD</MenuItem>
                  </TextField>

                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    sx={commonFieldSx}
                    InputLabelProps={commonLabelProps}
                    label="봇 이름"
                    value={botName}
                    onChange={(e) => setBotName(e.target.value)}
                    placeholder="예: NotificationBot"
                  />
                </Stack>

                <Divider />

                {renderChannelFields()}

                {errorMsg && (
                  <Alert severity="error" variant="outlined">
                    {errorMsg}
                  </Alert>
                )}
                {successMsg && (
                  <Alert severity="success" variant="outlined">
                    {successMsg}
                  </Alert>
                )}

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#111",
                      color: "#fff",
                      fontWeight: 700,
                      "&:hover": { backgroundColor: "#000" },
                    }}
                    onClick={handleSubmit}
                    disabled={submitting || !isFormValid}
                  >
                    {submitting ? "저장 중..." : "저장"}
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "#111",
                      borderColor: "#111",
                      fontWeight: 700,
                      "&:hover": { borderColor: "#000", color: "#000" },
                    }}
                    onClick={() => {
                      setBotName("");
                      setChannelType("DISCORD");
                      setDiscordWebhookUrl("");
                      setErrorMsg("");
                      setSuccessMsg("");
                    }}
                  >
                    초기화
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5} sx={{ display: "flex", minHeight: 0 }}>
            <Paper
              elevation={1}
              sx={{
                p: 2,
                borderRadius: 2,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                minHeight: "100%",
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ flexShrink: 0 }}>
                저장된 채널 목록
              </Typography>

              <TextField
                size="small"
                fullWidth
                variant="outlined"
                placeholder="검색 (봇 이름/타입)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                sx={{ mb: 2 }}
              />

              {filteredList.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  저장된 설정이 없습니다.
                </Typography>
              ) : (
                <Stack spacing={1} sx={{ flex: 1, minHeight: 0, overflow: "auto" }}>
                  {filteredList.map((item) => (
                    <Paper
                      key={item.id || `${item.channelType}-${item.botName}`}
                      variant="outlined"
                      sx={{ p: 1, borderRadius: 1 }}
                    >
                      <Typography variant="subtitle2">{item.botName}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.channelType}
                      </Typography>
                    </Paper>
                  ))}
                </Stack>
              )}
            </Paper>
          </Grid>
        </Grid>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default AlertSystemConfiguration;
