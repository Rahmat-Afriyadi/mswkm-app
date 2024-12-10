"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import withReactContent from "sweetalert2-react-content";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { readManyMerchant } from "@/server/merchant/read-many-merchant";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import DataTable from "@/components/organism/table/data-table";
import ActionButton from "@/components/form/input/action-button";
import { useSession } from "next-auth/react";
import Badge from "@/components/atoms/badge";

const MySwal = withReactContent(Swal);

const MerchantPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { data: session } = useSession();
  const role = session?.user?.role;
  const canEditMerchant = true;
  const canDeleteMerchant = true;

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

  const { data, error, isLoading } = useQuery({
    queryKey: ["merchants", limit, search, pageParams],
    queryFn: async () =>
      await readManyMerchant({
        limit,
        search,
        pageParams,
      }),
  });

  const columns = [
    {
      header: "Nama Merchant",
      accessorKey: "nama",
    },
    {
      header: "Nama PIC",
      accessorKey: "nama_pic",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Website",
      accessorKey: "website",
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
            disabled={!canEditMerchant}
            onClick={() => {
              router.push("/admin/merchant/update/" + row.original.id);
            }}
          />
          {/* Delete Button */}
          <ActionButton
            theme="danger"
            size="small"
            icon={TrashIcon}
            disabled={!canDeleteMerchant}
            onClick={() => handleDelete(row.getValue("id"))}
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

  const handleDelete = async () => {
    try {
      const result = await MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await MySwal.fire("Deleted!", "Your file has been deleted.", "success");
        setShow(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="px-4 sm:px-0 lg:px-0">
        <DataTable columns={columnByRole} data={data} />
      </div>
    </>
  );
};

export default MerchantPage;
