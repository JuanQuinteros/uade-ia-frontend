import { Box, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { CMSTableBodyRow } from './CMSTableBodyRow';
import { CMSTableHeadCell } from './CMSTableHeadCell';

const styles = {
  tableHeadRow: (theme) => ({
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  }),
}

/**
 * Table to show properly formatted contents and carousels
 * It will hide columns if screen is too small
 */
export function CMSTable({
  items = [],
  columns = [],
  url = '',
  page = 0,
  pages = 0,
  onDelete = (item) => {},
  onPageChange = (event, value) => {},
}) {

  if(items.length === 0) {
    return (
      <Typography align="center">
        Nada por aquí todavía 👀...
      </Typography>
    );
  }

  function handleDelete(item) {
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
              key={item.id}
              item={item}
              columns={columns}
              url={url}
              onDelete={handleDelete}
            />
          ))}
        </TableBody>
      </Table>
      <Box my={1} display="flex" justifyContent="center">
        <Pagination
          color="primary"
          count={pages}
          page={page}
          onChange={onPageChange}
        />
      </Box>
    </TableContainer>
  )
}
