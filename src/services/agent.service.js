import api from "./api";

export const getAllAgents = async () => {
    const res = await api.get(`/agents`);
    return res.data;
};

export const getAgentById = async (id) => {
    const res = await api.get(`/agents/${id}`);
    return res.data;
};

export const createAgent = async (agent) => {
    const res = await api.post("/agents", agent);
    return res.data;
};

export const updateAgent = async (id, agent) => {
    const res = await api.put(`/agents/${id}`, agent);
    return res.data;
};

export const deleteAgent = async (id) => {
    await api.delete(`/agents/${id}`);
};

export const toggleAgentStatus = async (id) => {
    const res = await api.patch(`/agents/${id}/status`);
    return res.data;
};