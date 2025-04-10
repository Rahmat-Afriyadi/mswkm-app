"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import withReactContent from "sweetalert2-react-content";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { readManyRole } from "@/server/admin/role/read-many-role";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import DataTable from "@/components/organism/table/data-table";
import ActionButton from "@/components/form/input/action-button";
import { useSession } from "next-auth/react";
import Badge from "@/components/atoms/badge";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import { RoleDelete } from "@/server/admin/role/role-delete";

const MySwal = withReactContent(Swal);

const RolePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { data: session } = useSession();
  const role = session?.user?.role;
  const canEditRole = true;
  const canDeleteRole = true;

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("limit", 10);
    params.set("search", "");
    params.set("pageParams", 1);
    replace(`${pathname}?${params}`);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const limit = searchParams.get("limit");
  const search = searchParams.get("search");
  const pageParams = searchParams.get("pageParams");

  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ["roles", limit, search, pageParams],
    queryFn: async () =>
      await readManyRole({
        limit,
        search,
        pageParams,
      }),
  });
  const deleteMut = useMutation({
    mutationFn: RoleDelete,
  });

  const columns = [
    {
      header: "Nama",
      accessorKey: "name",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          {/* Edit Button */}
          <ActionButton
            theme="primary"
            size="small"
            icon={PencilSquareIcon}
            disabled={!canEditRole}
            onClick={() => {
              router.push("/admin/role/update/" + row.original.id);
            }}
          />
          {/* Delete Button */}
          <ActionButton
            theme="danger"
            size="small"
            icon={TrashIcon}
            disabled={!canDeleteRole}
            onClick={() => handleDelete(row.original.id)}
          />
        </div>
      ),
    },
  ];

  const columnByRole = columns.filter((col) => {
    if (col.accessorKey === "actions" && role?.name === "Manager") {
      return false; // Hilangkan kolom 'Action' untuk manager
    }
    return true;
  });

  const handleDelete = async (id) => {
    try {
      const result = await MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        preConfirm: () => {
          deleteMut.mutate(id, {
            onSuccess: (data) => {
              queryClient.invalidateQueries({ queryKey: ["roles"] });
              Swal.fire("Success!", `Data berhasil dihapus`, "info").then(() => {
                router.replace("/admin/role");
              });
            },
            onError: (e) => {
              console.log("ini error ", e);
              Swal.fire("Failed!", e.response.data.message, "error");
            },
          });
        },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="w-full flex flex-col items-center bg-cover bg-center h-screen justify-center">
          <ClipLoader size={100} color="#3498db" cssOverride={{ borderWidth: 5, marginTop: -5 }} />
        </div>
      </div>
    );
  }
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="px-4 sm:px-0 lg:px-0">
        <DataTable columns={columnByRole} data={data} />
      </div>
    </>
  );
};

export default RolePage;
