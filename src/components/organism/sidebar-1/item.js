import {
  ChartPieIcon,
  Cog6ToothIcon,
  UsersIcon,
  FolderIcon,
  LockClosedIcon,
  CurrencyDollarIcon,
  SignalIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  {
    name: "Merchant",
    to: "/admin/data-renewal",
    icon: ChartPieIcon,
  },
  {
    name: "Outlet",
    to: "/admin/outlet",
    icon: ChartPieIcon,
  },
  // {
  //   name: "Export WA Blast",
  //   to: "/wa-blast",
  //   icon: UsersIcon,
  // },
  // {
  //   name: "Edit Jenis Bayar",
  //   to: "/edit-jenis-bayar",
  //   icon: FolderIcon,
  // },
  // {
  //   name: "Asuransi",
  //   to: "/asuransi",
  //   icon: FolderIcon,
  // },
  // {
  //   name: "Asuransi Pending",
  //   to: "/asuransi-pending",
  //   icon: SignalIcon,
  // },
  // {
  //   name: "Asuransi Tidak Berminat",
  //   to: "/asuransi-not-oke",
  //   icon: LockClosedIcon,
  // },
  // {
  //   name: "Asuransi Berminat",
  //   to: "/asuransi-oke",
  //   icon: CurrencyDollarIcon,
  // },
  // {
  //   name: "Rekap Verifikasi",
  //   to: "/rekap",
  //   icon: FolderIcon,
  // },
  // {
  //   name: "Approval",
  //   to: "/approval",
  //   icon: FolderIcon,
  // },
  // {
  //   name: "On The Road",
  //   to: "/otr",
  //   icon: FolderIcon,
  // },
  // {
  //   name: "Master Kendaraan",
  //   to: "/mst-mtr",
  //   icon: FolderIcon,
  // },
  // {
  //   name: "Produk",
  //   to: "/produk",
  //   icon: FolderIcon,
  // },
  // {
  //   name: "Vendor",
  //   to: "/vendor",
  //   icon: FolderIcon,
  // },
  // {
  //   name: "Transaksi",
  //   to: "/transaksi",
  //   icon: FolderIcon,
  // },
  // finance
  // {
  //   name: "Input Bayar",
  //   to: "/input-bayar",
  //   icon: FolderIcon,
  // },
  // {
  //   name: "Input Tanggal Merah",
  //   to: "/input-tanggal-merah",
  //   icon: FolderIcon,
  // },
  // {
  //   name: "Pengajuan Extend Bayar",
  //   to: "/pengajuan-extend-bayar",
  //   icon: FolderIcon,
  // },
  // {
  //   name: "Approval Extend Bayar",
  //   to: "/approval-extend-bayar",
  //   icon: FolderIcon,
  // },
];

const secondaryNavigation = [{ name: "Settings", to: "/settings", icon: Cog6ToothIcon }];

export { navigation, secondaryNavigation };
