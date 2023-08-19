function OrderRecord({ item, calculateSubtotal }) {
    return (
        <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>{calculateSubtotal(item)}</td>
        </tr>
    );
}

export default OrderRecord;
