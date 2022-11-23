import classes from "./Footer.module.css";

const Footer = (props) => {
  return (
    <div className={classes.footer}>
      <div className={classes.innerFooter}>
        <p className={classes.textFooter}>Ứng dụng thi trắc nghiệm online</p>
      </div>
    </div>
  );
};

export default Footer;
