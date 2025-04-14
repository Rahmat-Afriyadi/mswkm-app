"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import withReactContent from "sweetalert2-react-content";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { readManyOutlet } from "@/server/admin/outlet/read-many-outlet";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import DataTable from "@/components/organism/table/data-table";
import ActionButton from "@/components/form/input/action-button";
import { useSession } from "next-auth/react";
import Badge from "@/components/atoms/badge";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import { OutletDelete } from "@/server/admin/outlet/outlet-delete";

const MySwal = withReactContent(Swal);

const OutletPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { data: session } = useSession();
  const canEditOutlet = true;
  const canDeleteOutlet = true;

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
    queryKey: ["outlets", limit, search, pageParams],
    queryFn: async () =>
      await readManyOutlet({
        limit,
        search,
        pageParams,
      }),
  });
  const deleteMut = useMutation({
    mutationFn: OutletDelete,
  });

  console.log("ini data outlet", data);

  const columns = [
    {
      header: "Nama Outlet",
      accessorKey: "nama",
    },
    {
      header: "Nama Merchant",
      accessorKey: "merchant.nama",
    },
    {
      header: "Nama PIC",
      accessorKey: "nama_pic",
    },
    {
      header: "Nomor Telepon PIC",
      accessorKey: "no_telp_pic",
    },
    {
      header: "Map",
      accessorKey: "map",
      cell: ({ row }) => (
        <a
          target="_blank"
          className="-ml-3 cursor-pointer"
          href={`https://www.google.com/maps?q=${row.original.latitude},${row.original.longitude}`}
        >
          <Image
            alt="gmaps-icon"
            src={"/images/content/button/gmaps.png"}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            className="max-w-12 mx-auto"
            blurDataURL="/images/content/profile/Photo.png"
          />
        </a>
      ),
    },
    {
      header: "Active",
      accessorKey: "is_active",
      cell: ({ row }) => {
        let color;
        if (row.original.is_active) {
          color = "green";
        } else {
          color = "red";
        }
        return <Badge color={color} label={row.original.is_active ? "Active" : "Inactive"} />;
      },
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
            disabled={!canEditOutlet}
            onClick={() => {
              router.push("/admin/outlet/update/" + row.original.id);
            }}
          />
          {/* Delete Button */}
          <ActionButton
            theme="danger"
            size="small"
            icon={TrashIcon}
            disabled={!canDeleteOutlet}
            onClick={() => handleDelete(row.original.id)}
          />
        </div>
      ),
    },
  ];

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
              queryClient.invalidateQueries({ queryKey: ["outlets"] });
              Swal.fire("Success!", `Data berhasil dihapus`, "info").then(() => {
                router.replace("/admin/outlet");
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
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default OutletPage;
