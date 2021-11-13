import { useShoppingCartContext } from "../../../context/cart/ShoppingCartContext";
import {
  calculateTotalPrice,
  removeImageFromImages,
} from "../../../firebase/domain";
import { CrossIcon } from "../../cross/CrossIcon";
import { formatPictureRoute } from "../../../routes/routes";
import { formatPrice } from "../../../pages/produkter";
import { Button, ErrorSpan } from "../../../styles/global";
import styled from "@emotion/styled";
import React from "react";
import { useFormContext } from "react-hook-form";
import {
  calculateShippingPrice,
  shippingTypeToString,
  FormData,
} from "../domain";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 24px;
`;

const TableHeader = styled.th`
  text-align: left;
  font-weight: lighter;
`;

const DataCell = styled.td`
  padding: 8px 0;
  font-size: 0.8em;
`;

const LeftDataCell = styled(DataCell)`
  text-align: left;
`;

const CenterDataCell = styled(DataCell)`
  text-align: center;
  cursor: pointer;
`;

const RightDataCell = styled(DataCell)`
  text-align: right;
  padding-right: 8px;
`;

const RadioButtonGroup = styled.fieldset`
  display: flex;
  flex-direction: column;
  border: none;
`;

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RadioLabel = styled.label`
  font-size: 0.9em;
  margin-left: 4px;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid black;
`;

type Props = {
  onClick: () => void;
};

const HandlevognTable: React.FC<Props> = ({ onClick }) => {
  const { items, setItems } = useShoppingCartContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useFormContext<FormData>();
  console.log(errors);

  const shippingPrice = calculateShippingPrice(watch("shippingType"));
  const totalPrice = calculateTotalPrice(items);

  return (
    <>
      <Table>
        <thead>
          <tr>
            <TableHeader>&nbsp;</TableHeader>
            <TableHeader style={{ textAlign: "center" }}>Bilde</TableHeader>
            <TableHeader>Tittel</TableHeader>
            <TableHeader style={{ textAlign: "right", paddingRight: 8 }}>
              Pris
            </TableHeader>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <TableRow key={item.title}>
              <CenterDataCell
                onClick={() => {
                  const newItems = removeImageFromImages(items)(item);
                  setItems(newItems);
                }}
              >
                <CrossIcon />
              </CenterDataCell>
              <CenterDataCell>
                <a href={formatPictureRoute(item.title.replace(" ", "-"))}>
                  <img src={item.href} alt={item.title} width={95} />
                </a>
              </CenterDataCell>
              <LeftDataCell style={{ color: "#5D6956" }}>
                {item.title}
              </LeftDataCell>
              <RightDataCell
                style={{
                  color: "#5D6956",
                }}
              >
                {formatPrice(item.price)}
              </RightDataCell>
            </TableRow>
          ))}
          <TableRow>
            <LeftDataCell style={{ paddingLeft: 8 }}>Sum</LeftDataCell>
            <LeftDataCell />
            <LeftDataCell />
            <RightDataCell>{formatPrice(totalPrice)}</RightDataCell>
          </TableRow>
          <TableRow>
            <LeftDataCell style={{ paddingLeft: 8 }}>Frakt</LeftDataCell>
            <LeftDataCell />
            <LeftDataCell>
              <RadioButtonGroup id="shippingType">
                <RadioContainer>
                  <input
                    {...register("shippingType", { required: true })}
                    type="radio"
                    name="shippingType"
                    value="HENTE"
                    id="hente"
                  />
                  <RadioLabel htmlFor="hente">
                    {shippingTypeToString("HENTE")}
                  </RadioLabel>
                </RadioContainer>
                <RadioContainer>
                  <input
                    {...register("shippingType", { required: true })}
                    type="radio"
                    name="shippingType"
                    value="USPORING"
                    id="usporing"
                  />
                  <RadioLabel htmlFor="usporing">
                    {shippingTypeToString("USPORING")}
                  </RadioLabel>
                </RadioContainer>
                <RadioContainer>
                  <input
                    {...register("shippingType", { required: true })}
                    type="radio"
                    name="shippingType"
                    value="SPORING"
                    id="sporing"
                  />
                  <RadioLabel htmlFor="sporing">
                    {shippingTypeToString("SPORING")}
                  </RadioLabel>
                </RadioContainer>
                {errors.shippingType && (
                  <ErrorSpan style={{ margin: 0, marginLeft: 4 }}>
                    Du må velge fraktmetode
                  </ErrorSpan>
                )}
              </RadioButtonGroup>
            </LeftDataCell>
            <RightDataCell>
              {shippingPrice !== null ? formatPrice(shippingPrice) : ""}
            </RightDataCell>
          </TableRow>
          <TableRow>
            <LeftDataCell style={{ paddingLeft: 8 }}>Totalt</LeftDataCell>
            <LeftDataCell />
            <LeftDataCell />
            <RightDataCell>
              {formatPrice(totalPrice + shippingPrice)}
            </RightDataCell>
          </TableRow>
        </tbody>
      </Table>
      <Button type="button" onClick={handleSubmit(onClick)}>
        Fortsett
      </Button>
    </>
  );
};

export default HandlevognTable;
