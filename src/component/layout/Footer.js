import classes from "./Footer.module.css";

const Footer = (props) => {
  return (
    <div className={classes.footer}>
      <div className={classes.innerFooter}>
        <p className={classes.textFooter}>Roomless S.R.L, P.IVA 02547910469</p>
      </div>
    </div>
  );
};

export default Footer;
