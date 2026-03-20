import api from "./api";

export const getTickets = async () => {
    const res = await api.get(`/tickets`);
    return res.data;
};

export const getTicketById = async (id) => {
    const res = await api.get(`/tickets/${id}`);
    return res.data;
};

export const createTicket = async (ticket) => {
    const res = await api.post("/tickets", ticket);
    return res.data;
};

export const updateTicket = async (id, ticket) => {
    const res = await api.put(`/tickets/${id}`, ticket);
    return res.data;
};

export const deleteTicket = async (id) => {
    await api.delete(`/tickets/${id}`);
};
