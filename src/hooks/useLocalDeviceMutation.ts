import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLocalDeviceMutation = (deviceIp: string) => {
  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`http://${deviceIp}/toggle`, {
        method: "POST",
      });
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["device", "state", deviceIp], data);
    },
  });

  const onMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`http://${deviceIp}/on`, {
        method: "POST",
      });
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["device", "state", deviceIp], data);
    },
  });

  const offMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`http://${deviceIp}/off`, {
        method: "POST",
      });
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["device", "state", deviceIp], data);
    },
  });

  return { toggleMutation, onMutation, offMutation };
};
