import { Box, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Typography } from "@mui/material";
import { CMSTableBodyRow } from './CMSTableBodyRow';
import { CMSTableHeadCell } from './CMSTableHeadCell';
import { CMSTableColumnType } from "./types";

const styles = {
  tableHeadRow: (theme: Theme) => ({
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  }),
}

interface CMSTableProps<T> {
  columns: CMSTableColumnType<T>[];
  editButton?: boolean;
  idField: keyof T;
  items: T[];
  url: string;
  page?: number;
  pages?: number;
  onDelete: (item: T) => void;
  onPageChange?: (event: React.ChangeEvent<unknown>, value: number) => void;
}

/**
 * Table to show properly formatted contents and carousels
 * It will hide columns if screen is too small
 */
export function CMSTable<T>({
  columns,
  editButton = true,
  idField,
  items,
  url = '',
  page = 0,
  pages = 0,
  onDelete,
  onPageChange,
} : CMSTableProps<T>) {

  if(items.length === 0) {
    return (
      <Typography align="center">
        No se encontraron resultados para esta búsqueda 😅
      </Typography>
    );
  }

  function handleDelete(item: any) {
    onDelete(item);
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={styles.tableHeadRow}>
            {columns.map((column, index) => (
              <CMSTableHeadCell key={index} column={column} />
            ))}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <CMSTableBodyRow
              key={String(item[idField])}
              idField={idField}
              item={item}
              columns={columns}
              url={url}
              editButton={editButton}
              onDelete={handleDelete}
            />
          ))}
        </TableBody>
      </Table>
      {typeof page === "undefined" ? null : (
        <Box my={1} display="flex" justifyContent="center">
          <Pagination
            color="primary"
            count={pages}
            page={page}
            onChange={onPageChange}
          />
        </Box>
      )}
    </TableContainer>
  )
}
