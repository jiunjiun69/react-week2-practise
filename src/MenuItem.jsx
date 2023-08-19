function MenuItem({ item, addOrder }) {
    return (
        <a href="#" className="list-group-item list-group-item-action" onClick={() => addOrder(item)}>
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{item.name}</h5>
                <small>{item.price}</small>
            </div>
            <p className="mb-1">{item.description}</p>
        </a>
    );
}

export default MenuItem;
